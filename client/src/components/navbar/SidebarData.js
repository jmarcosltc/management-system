import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Estoque',
    path: '/estoque',
    icon: <AiIcons.AiOutlineSolution />,
    cName: 'nav-text'
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: <AiIcons.AiOutlineShopping />,
    cName: 'nav-text'
  },
  {
    title: 'Transações',
    path: '/transacoes',
    icon: <AiIcons.AiOutlineSync />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/sair',
    icon: <AiIcons.AiOutlineVerticalAlignTop />,
    cName: 'nav-text'
  },
];