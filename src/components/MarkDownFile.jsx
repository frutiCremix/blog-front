import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';
const apiUrl = import.meta.env.VITE_API_URL;
let doc='';

const customRenderers = {
  h1: ({ children }) => <h1 style={{ fontSize: "32px", color: "#333", borderBottom: "2px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize: "24px", color: "#007BFF", marginTop: "30px" }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: "20px", color: "#28A745", marginTop: "20px" }}>{children}</h3>,
  p: ({ children }) => <p style={{ marginBottom: "20px" }}>{children}</p>,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return !inline && match ? (
      <pre style={{ backgroundColor: "#f8f9fa", padding: "10px", border: "1px solid #dee2e6", borderRadius: "4px", overflow: "auto" }}>
        <code className={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </code>
      </pre>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children }) => <ul style={{ marginBottom: "20px" }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ marginBottom: "20px" }}>{children}</ol>,
  li: ({ children }) => <li style={{ marginBottom: "5px" }}>{children}</li>,
};

export default function MarkDownFile({url}) {
  const location = useLocation();
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  useEffect(() => {
    setIsLoadingContent(true);
    if (url) {
      // Si se proporciona la URL, establecer directamente el contenido
      fetch(`${apiUrl}/obtener-articulo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Error al obtener el contenido del artículo');
      })
      .then(data => {
        setMarkdownContent(data);
        setIsLoadingContent(false);
      })
      .catch(error => {
        console.error('Error al obtener el artículo:', error);
        setIsLoadingContent(false);
      });
    } else {
      const id = location.pathname.split('/').pop();
      // Si no se proporciona la URL, obtener la URL del artículo por ID
      fetch(`${apiUrl}/get/${id}`)
        .then(response => {
               return response.json();
        })
        .then(data => {
          cargandoDoc(data.url);
        })
        .catch(error => {
          console.error('Error al obtener la URL del artículo:', error);
          setIsLoadingContent(false);
        });
    }
  }, []); 

  async function cargandoDoc(url){
    // Realizar la segunda solicitud solo cuando doc tenga un valor
    if (url) {
      fetch(`${apiUrl}/obtener-articulo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      .then(response => {
          return response.text();
      })
      .then(data => {
        setMarkdownContent(data);
        setIsLoadingContent(false);
      })
      .catch(error => {
        console.error('Error al obtener el artículo:', error);
        setIsLoadingContent(false);
      });
    }
  }

  return (
    <>
      <Header/>
      <article className='w-full h-full min-h-screen flex items-center mt-16'>
        {isLoadingContent ? (
          <Spinner/>
        ) : (
          <Markdown className="font-sans tracking-wide h-auto w-full shadow-lg bg-gray-50 p-4 max-w-screen-md mx-auto" components={customRenderers}>
            {markdownContent}
          </Markdown>
        )}
      </article>
      <Footer/>
    </>
  );
}
