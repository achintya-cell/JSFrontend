import conf from '../conf/conf';
import { Client, Databases, Storage, ID } from "appwrite";

export class Config {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }){
    try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
    }catch(error){
        console.error("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }){
    try{
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );
    }catch(error){
        console.error("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug){
    try{
        await this.databases.deletePost(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
        return true;
    }catch(error){
        console.error("Appwrite service :: deletePost :: error", error);
        return false;
    }
  }

  async getPost(slug){
    try{
        return await this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
        )
    }catch(error){
        console.error("Appwrite service :: getPost :: error", error);
        return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try{
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries,
        )
    }catch(error){
        console.error("Appwrite service :: getPosts :: error", error);
        return false;
    }
  }

  //file upload services
  async uploadFile(file){
    try{
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file,
        );
    }catch(error){
        console.error("Appwrite service :: uploadFile :: error", error);
        return false;
    }
  }

  async deleteFile(fileID){
    try{
        await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileID
        );
        return true;
    }catch(error){
        console.error("Appwrite service :: deleteFile :: error", error);
        return false;
    }
  }

  getFilePreview(fileID){
    return this.bucket.getFilePreview(
        conf.appwriteBucketID,
        fileID
    )
  }

}

const config = new Config();
export default config;
