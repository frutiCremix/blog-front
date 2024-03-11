import { useState } from "react";
import Article from "./Article.jsx";
import Filter from "./Filter.jsx";
export default function ArticlesList({ articles, handler }) {
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  
  function handleClickFilter(categoria) {
    setFiltroCategoria(categoria);
   
  }
  function articulosFiltrados() {
    return filtroCategoria
      ? articles.filter((e) => e.categoria === filtroCategoria)
      : articles;
  }
  

  return (
    <section className="min-h-screen h-auto mx-10 shadow-lg mt-16 mb-16 flex flex-col gap-2 ">
      <div className="w-full flex justify-end items-center gap-2">
        <span className="text-lg font-serif font-semibold tracking-widest">Filtros:</span>
        <Filter
          categoria={"javascript"}
          handleClickFilter={handleClickFilter}
        />
        <Filter categoria={"nodejs"} handleClickFilter={handleClickFilter} />
        <Filter categoria={"react"} handleClickFilter={handleClickFilter} />
        <Filter categoria={null} handleClickFilter={handleClickFilter} />
        
      </div>
      <ul className="bg-gray-50 divide-y divide-gray-200">
       
        {//aplicamos reverse para que se muestren el utimo antes
        articulosFiltrados().map((article) => (
          <Article
            key={article.id}
            id={article.id}
            titulo={article.titulo}
            desc={article.desc}
            url={article.url}
            urlImg={article.urlImg}
            fecha={article.fecha}
            handler={handler}
          />
        )).reverse()}
      </ul>
    </section>
  );
}
