import { useState,useEffect } from 'react'
import Header from './Header';
import ArticlesList from './ArticleList';
import Footer from './Footer';
const apiUrl = import.meta.env.VITE_API_URL;

export default function Inicio({handler}){
    
    

    const [articles,setArticles]=useState([])
    useEffect(()=>{
        fetch(`${apiUrl}/getAll`)
        .then(res=>res.json())
        .then(data=>(
          console.log(data),
          setArticles(data))
        )}
    ,[]);
    
    return (
        <div>
            <Header/>
            <ArticlesList articles={articles} handler={handler}/>
            <Footer/>
        </div>
    )
}