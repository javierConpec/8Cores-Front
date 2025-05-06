import { useEffect, useState } from "react";
import { IDocuments } from "../Interfaces/documents";
import { getDocuments } from "../Services/documentService";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<IDocuments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    getDocuments()
      .then((documents) => {
        if (isMounted) {
          setDocuments(documents);
        }
      })
      .catch((error) => console.error("Error al obtener los documents", error))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);
  return { documents, loading };
};
