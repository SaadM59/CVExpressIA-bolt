import { put, list, del } from '@vercel/blob';

export async function uploadToBlobStorage(
  fileBuffer: Buffer, 
  fileName: string
): Promise<string> {
  try {
    // Upload avec expiration de 24h
    const blob = await put(fileName, fileBuffer, {
      access: 'public',
      addRandomSuffix: true,
    });
    
    return blob.url;
    
  } catch (error) {
    console.error('Erreur lors de l\'upload vers Blob Storage:', error);
    throw new Error('Erreur lors du stockage du fichier');
  }
}

export async function purgeBlobStorage(): Promise<number> {
  try {
    // Lister tous les blobs
    const { blobs } = await list();
    
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    let purgedCount = 0;
    
    // Supprimer les fichiers de plus de 24h
    for (const blob of blobs) {
      const blobDate = new Date(blob.uploadedAt);
      
      if (blobDate < twentyFourHoursAgo) {
        try {
          await del(blob.url);
          purgedCount++;
          console.log(`Fichier supprimé: ${blob.pathname}`);
        } catch (deleteError) {
          console.error(`Erreur lors de la suppression de ${blob.pathname}:`, deleteError);
        }
      }
    }
    
    return purgedCount;
    
  } catch (error) {
    console.error('Erreur lors de la purge des blobs:', error);
    throw new Error('Erreur lors de la purge automatique');
  }
}

export async function getBlobInfo(url: string) {
  try {
    const { blobs } = await list();
    return blobs.find(blob => blob.url === url);
  } catch (error) {
    console.error('Erreur lors de la récupération des infos blob:', error);
    return null;
  }
}