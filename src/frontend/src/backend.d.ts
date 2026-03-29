import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    excerpt: string;
}
export interface Service {
    id: bigint;
    icon: string;
    name: string;
    description: string;
}
export type Time = bigint;
export interface NewsletterSubscriber {
    email: string;
    timestamp: Time;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    rating: number;
    price: number;
}
export interface backendInterface {
    createBlogPost(blogPost: BlogPost): Promise<void>;
    createProduct(product: Product): Promise<void>;
    createService(service: Service): Promise<void>;
    deleteBlogPost(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllNewsletterSubscribers(): Promise<Array<NewsletterSubscriber>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllServices(): Promise<Array<Service>>;
    getBlogPostById(id: bigint): Promise<BlogPost>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    submitContactForm(contact: ContactSubmission): Promise<void>;
    subscribeToNewsletter(email: string): Promise<void>;
    updateBlogPost(id: bigint, blogPost: BlogPost): Promise<void>;
    updateProduct(id: bigint, product: Product): Promise<void>;
}
