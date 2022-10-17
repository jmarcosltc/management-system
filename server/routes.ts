require('dotenv').config({path: '../.env'});
import express, { Request, Response, NextFunction, Express} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { json } from 'stream/consumers';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { adicionarProduto, comprarProduto, editarProduto, listarProdutos, Produto, removerProduto, venderProduto } from '../database/firebase';
import authenticateLogin from './auth';
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

declare module 'express' {
    interface Request {
      email?: any;
    }
  }

// Get users in the system
const user: any[] = [];
router.get('/user/:id', async (req: any, res: { send: (arg0: string) => void; }) => {
    user[0] = 1
    res.send('contatos')
})

// Function to authenticate the token
function authenticateToken(req: Request, res: { sendStatus: (arg0: number) => any; }, next: () => void) {
    const token = req.cookies.access_token
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.email = data.email
        return next();
    } catch {
        return res.sendStatus(403);
    }
  }

// Route to login user
router.post('/login', async (req: any, res: {
    status: any; send: (arg0: string) => void; 
}) => {
    const isAuthenticated = await authenticateLogin(req.body.email, req.body.password)
    if (isAuthenticated) {
        const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
            expiresIn: 3600
        });
        res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: false,
            secure: false
          }).json({ message: "Logged in successfully." }).send()
        
          return { user: { email: req.body.email }, token: token };
    } else {
        res.status(401)
    }
})

// Route to logout users
router.get('/logout', authenticateToken, (req, res) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
})

// Route to check the acces_token
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
    return res.status(200).send()
})

// Route to check the products
router.get('/produtos/:id', authenticateToken, (req, res) => {
    res.json('teste').send()
})

// Route to create a product
router.post('/produtos', authenticateToken, (req: Request, res: Response) => {
    const { nome, nserie, imei, cor, marca, tipo } = req.body
    const preco: number = parseFloat(req.body.preco)
    const produto: Produto = {
        nome: nome,
        nserie: nserie,
        imei: imei,
        preco: preco,
        cor: cor,
        marca: marca,
        tipo: tipo
    }

    // Call firebase function to create products and return status 200
    if(adicionarProduto(produto) != undefined) {
        res.status(200).send()
    } else {
        res.status(403).send()
    }

})

// Route to edit a product
router.put('/produtos/:id', authenticateToken, (req: Request, res: Response) => {
    const { nome, nserie, imei, cor, preco, marca, tipo } = req.body
    const produto: Produto = {
        nome: nome,
        nserie: nserie,
        imei: imei,
        preco: preco,
        cor: cor,
        marca: marca,
        tipo: tipo
    }

    if(editarProduto(produto, req.params.id) != undefined) {
        res.status(200).send()
    } else {
        res.status(403).send()
    }
})

// Route to delete a product
router.delete('/produtos/:id', authenticateToken, (req: Request, res: Response) => {

    if(removerProduto(req.params.id) != undefined) {
        res.status(200).send()
    } else {
        res.status(403).send()
    }
})

// Route to list all products
router.get('/produtos', authenticateToken, async (req: Request, res: Response) => {

    const products: any = await listarProdutos();

    if(products != undefined) {
        res.status(200).send(products)
    } else {
        res.status(403)
    }
})

// Route to sell a product
router.post('/venda/:id', authenticateToken, (req: Request, res: Response) => {
    const { email } = req.body
    const preco: number = req.body.preco

    if(venderProduto(email, preco, req.params.id) != undefined) {
        res.status(200).send()
    } else {
        res.status(403)
    }
})

// Route to "buy" a product
router.post('/compra', authenticateToken, (req: Request, res: Response) => {
    const { email } = req.body
    const { nome, nserie, imei, cor, marca, tipo } = req.body
    const preco: number = parseFloat(req.body.preco)
    
    const produto: Produto = {
        nome: nome,
        nserie: nserie,
        imei: imei,
        preco: preco,
        cor: cor,
        marca: marca,
        tipo: tipo
    }

    if(comprarProduto(email, preco, produto) != undefined) {
        res.status(200).send()
    } else {
        res.status(403)
    }
})

// Route to get sold products
router.get('/venda', authenticateToken, (req: Request, res: Response) => {
    
    
})

// Route to get all products 
router.get('/compra', authenticateToken, (req: Request, res: Response) => {
    

    
})

// Create user in the system
router.post('/user', async (req: any, res: { send: (arg0: string) => void; }) => {
        const newUser = [{
            id: uuidv4(),
            user: req.body.user,
            email: req.body.email,
            password: req.body.password
        }]

        res.send(newUser.toString())
})


export default router