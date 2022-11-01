require('dotenv').config({path: '../client/.env'});
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    child,
    get,
    getDatabase,
    increment,
    push,
    ref,
    remove,
    runTransaction,
    set,
    update,
  } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { NotEmittedStatement } from "typescript";
import { getFirestore, collection, query, where, getDocs, getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Referencia do banco realtime
const rdb = getDatabase();

// Referencia do banco firestore
const fdb = getFirestore()
const userRef = collection(fdb, 'users')

export interface Produto {
    nome: string,
    cor?: string,
    nserie?: string,
    imei?: string,
    preco: number,
    marca: string,
    tipo: string
}

// Funções de autenticação:
export const authenticate = async (email: string, password: string) => {
    const q = query(userRef, where('email', '==', email)) //.where('password', '==', password);
    let isAuth = false;
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        if(doc.data().senha == password) {
            isAuth = true
        } else {
            isAuth = false
        }
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });

    return isAuth
}


// Funções de produtos:

// Adicionar um produto nos produtos
export const adicionarProduto = (produto: Produto) => {

    //generates random id;
    const guid = () => {
      let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      //return id of format 'aaaa'-'aaaa'
      return s4() + '-' + s4()
    }

    const id = uuidv4();
    const productId = guid()

    const preco: number = Number(produto.preco)

    set(ref(rdb, 'produtos/' + id), {
        id: productId,
        tipo: produto.tipo,
        nome: produto.nome,
        cor: produto.cor,
        nserie: produto.nserie,
        preco: preco,
        imei: produto.imei,
        marca: produto.marca
    });

  return true
};

// Editar um produto
export const editarProduto = (produto: Produto, id: string) => {

    update(ref(rdb, 'produtos/' + id + '/informacoes'), {
      tipo: produto.tipo,
      nome: produto.nome,
      produto: produto.cor,
      nserie: produto.nserie,
      preco: produto.preco,
      imei: produto.imei,
      marca: produto.marca
    });

  return true;
};

// Remover um produto
export const removerProduto = async (id: string, email: string, value: number) => {

  await get((ref(rdb, `produtos/`)))
    .then((snapshot) => {

      if (snapshot.exists()) {
        const objects: any[] = (Object.entries(snapshot.val()))

        for(let i = 0; i < objects.length; i++) {
          if(objects[i][1].id === id) {
            remove((ref(rdb, 'produtos/' + objects[i][0])))
          }
        }
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
    console.error(error);
  });


  let valorTotal: number = 0;
  const q = query(userRef, where('email', '==', email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    valorTotal += doc.data().compras
  })

  await updateDoc(doc(fdb, "users", "kGJcATDyOOcNX2IpcDn4"), {
    compras: valorTotal - value
  });


  return true;
};

// Listar todos os produtos
export const listarProdutos = () => {
  var values = get((ref(rdb, `produtos/`)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // o certo é .values
        const objects: any[] = (Object.values(snapshot.val()))
        return objects;
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

    return values
}

// Vender um produto
export const venderProduto = async (email: string, value: number, id: string) => {
  //const userRef = collection(fdb, 'users/' + email)
  let valorTotal: number = 0;
  const q = query(userRef, where('email', '==', email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    valorTotal += doc.data().vendas
  })

  await updateDoc(doc(fdb, "users", "kGJcATDyOOcNX2IpcDn4"), {
    vendas: valorTotal + value
  });

  var values = get((ref(rdb, `produtos/`)))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const objects: any[] = (Object.entries(snapshot.val()))

        for(let i = 0; i < objects.length; i++) {
          if(objects[i][1].id === id) {
            remove((ref(rdb, 'produtos/' + objects[i][0])))
          }
        }
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
    console.error(error);
  })

  return true;
}

// Comprar um produto
// O termo comprar é usado aqui de forma não adequada
// "comprar" significa registrar um produto que foi comprado no sistema
export const comprarProduto = async (email: string, value: number, produto: Produto) => {

  //generates random id;
  const guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaa'-'aaaa'
    return s4() + '-' + s4()
  }

  const id = uuidv4();
  const productId = guid()

  const preco: number = Number(produto.preco)

  set(ref(rdb, 'produtos/' + id), {
      id: productId,
      tipo: produto.tipo,
      nome: produto.nome,
      cor: produto.cor,
      nserie: produto.nserie,
      preco: preco,
      imei: produto.imei,
      marca: produto.marca
  });

  //const userRef = collection(fdb, 'users/' + email)
  let valorTotal: number = 0;
  const q = query(userRef, where('email', '==', email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    valorTotal += doc.data().compras
  })

  await updateDoc(doc(fdb, "users", "kGJcATDyOOcNX2IpcDn4"), {
    compras: valorTotal + value
  });

  return true;
}