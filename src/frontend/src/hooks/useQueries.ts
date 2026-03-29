import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, Product, Service } from "../backend.d";
import {
  sampleBlogPosts,
  sampleProducts,
  sampleServices,
} from "../data/sampleData";
import { useActor } from "./useActor";

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return sampleProducts;
      const result = await actor.getAllProducts();
      return result.length > 0 ? result : sampleProducts;
    },
    enabled: !isFetching,
    initialData: sampleProducts,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return sampleProducts.filter((p) => p.featured);
      const result = await actor.getFeaturedProducts();
      return result.length > 0
        ? result
        : sampleProducts.filter((p) => p.featured);
    },
    enabled: !isFetching,
    initialData: sampleProducts.filter((p) => p.featured),
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (category === "All") {
        if (!actor) return sampleProducts;
        const result = await actor.getAllProducts();
        return result.length > 0 ? result : sampleProducts;
      }
      if (!actor) return sampleProducts.filter((p) => p.category === category);
      const result = await actor.getProductsByCategory(category);
      return result.length > 0
        ? result
        : sampleProducts.filter((p) => p.category === category);
    },
    enabled: !isFetching,
    initialData:
      category === "All"
        ? sampleProducts
        : sampleProducts.filter((p) => p.category === category),
  });
}

export function useAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return sampleBlogPosts;
      const result = await actor.getAllBlogPosts();
      return result.length > 0 ? result : sampleBlogPosts;
    },
    enabled: !isFetching,
    initialData: sampleBlogPosts,
  });
}

export function useAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return sampleServices;
      const result = await actor.getAllServices();
      return result.length > 0 ? result : sampleServices;
    },
    enabled: !isFetching,
    initialData: sampleServices,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        timestamp: BigInt(Date.now()) * 1_000_000n,
      });
    },
  });
}

export function useSubscribeNewsletter() {
  const queryClient = useQueryClient();
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.subscribeToNewsletter(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });
}
