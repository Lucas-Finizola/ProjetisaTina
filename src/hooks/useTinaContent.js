import { useState, useEffect } from 'react';
import { client } from "../../tina/__generated__/client";

export const useTinaContent = (collection, relativePath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let result;
        
        switch (collection) {
          case 'page':
            result = await client.queries.page({ relativePath });
            break;
          case 'post':
            result = await client.queries.post({ relativePath });
            break;
          case 'project':
            result = await client.queries.project({ relativePath });
            break;
          case 'service':
            result = await client.queries.service({ relativePath });
            break;
          case 'settings':
            result = await client.queries.settings({ relativePath });
            break;
          default:
            throw new Error(`Collection ${collection} not found`);
        }
        
        setData(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (collection && relativePath) {
      fetchContent();
    }
  }, [collection, relativePath]);

  return { data, loading, error };
};

export const useTinaCollection = (collection) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        let result;
        
        switch (collection) {
          case 'posts':
            result = await client.queries.postConnection();
            break;
          case 'pages':
            result = await client.queries.pageConnection();
            break;
          case 'projects':
            result = await client.queries.projectConnection();
            break;
          case 'services':
            result = await client.queries.serviceConnection();
            break;
          default:
            throw new Error(`Collection ${collection} not found`);
        }
        
        setData(result.data[collection]?.edges || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (collection) {
      fetchCollection();
    }
  }, [collection]);

  return { data, loading, error };
};

