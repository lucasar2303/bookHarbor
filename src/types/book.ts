
export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      subtitle:string;
      authors: string[];
      publishedDate: string;
      pageCount: number
      description: string;
      imageLinks:{
        thumbnail: string;
        }
      previewLink: string;
      infoLink: string;
        

    };
    
  }
  