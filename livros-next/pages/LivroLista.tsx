import type { NextPage } from "next";
import { useState, useEffect } from "react"
import React from "react";
import { Livro } from "@/classes/modelo/Livro";
import { ControleLivro } from "@/classes/controle/ControleLivros";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import styles from '../styles/Home.module.css'
import Head from "next/head";
import { Menu } from "@/componentes/Menu";

const baseURL: string = "http://localhost:3000/api/livros";
const controleLivro = new ControleLivro();

const obter = async () => {
    const response = await fetch(baseURL);
    return(
        response.json()
    );
}

/*-----------------EM CONSTRUÇÃO----------------------*/

const excluirLivro = async (codigo: number) => {
    const num = codigo.toString();
    const response = await fetch(baseURL);
    const dados = await fetch(baseURL, {
      method: "DELETE",
      body: JSON.stringify({ codigo_livro: codigo }),
    });
};

/*-----------------EM CONSTRUÇÃO----------------------*/

const LivroLista: NextPage = () =>  {

    const [livros, setLivros] = useState<Array<Livro>>(controleLivro.obterLivros());
    const [carregado, setCarregado] = useState<boolean>(false);
    
    useEffect(() => {
        setLivros(controleLivro.obterLivros());
        setCarregado(true);
    }, [carregado]);

/*-----------------EM CONSTRUÇÃO----------------------*/

    const excluirLivro = async (cod: number) => {
        /* console.log("Código Recebido: " + cod); */
        const baseURL = "http://localhost:3000/api/livros";
        const dados = await fetch(baseURL, {
          method: "DELETE",
          body: JSON.stringify({ codigo_livro: cod }),
        });
    
        setCarregando(true);
    
        console.log(dados);
      };

/*-----------------EM CONSTRUÇÃO----------------------*/
    
    return(
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Menu/>
            <main>
                <h1>Lista de Livros</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Resumo</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        livros.map((livro) => {return (<LinhaLivro key={livro.codigo}
                                                                    livros={livro}
                                                                    excluir={excluirLivro}/>
                                                    );})
                    }
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default LivroLista;