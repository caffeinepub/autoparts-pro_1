import Text "mo:core/Text";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrl : Text;
    rating : Float;
    featured : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compareByCategory(product1 : Product, product2 : Product) : Order.Order {
      switch (Text.compare(product1.category, product2.category)) {
        case (#equal) { compare(product1, product2) };
        case (order) { order };
      };
    };
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    date : Text;
    imageUrl : Text;
  };

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    icon : Text;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type NewsletterSubscriber = {
    email : Text;
    timestamp : Time.Time;
  };

  let products = Map.empty<Nat, Product>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let services = Map.empty<Nat, Service>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let newsletterSubscribers = Map.empty<Text, NewsletterSubscriber>();

  var nextProductId = 1;
  var nextBlogPostId = 1;
  var nextServiceId = 1;
  var nextContactId = 1;

  let adminPrincipal = Principal.fromText("2vxsx-fae");

  // Create Product
  public shared ({ caller }) func createProduct(product : Product) : async () {
    requireAdmin(caller);
    let newProduct : Product = {
      product with
      id = nextProductId;
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
  };

  // Update Product
  public shared ({ caller }) func updateProduct(id : Nat, product : Product) : async () {
    requireAdmin(caller);
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    let updatedProduct : Product = {
      product with
      id;
    };
    products.add(id, updatedProduct);
  };

  // Delete Product
  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    requireAdmin(caller);
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  // Get All Products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  // Get Products by Category
  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category }).sort(Product.compareByCategory);
  };

  // Get Featured Products
  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.featured });
  };

  // Get Product by Id
  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Blog Posts
  public shared ({ caller }) func createBlogPost(blogPost : BlogPost) : async () {
    requireAdmin(caller);
    let newBlogPost : BlogPost = {
      blogPost with
      id = nextBlogPostId;
    };
    blogPosts.add(nextBlogPostId, newBlogPost);
    nextBlogPostId += 1;
  };

  public shared ({ caller }) func updateBlogPost(id : Nat, blogPost : BlogPost) : async () {
    requireAdmin(caller);
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post not found");
    };
    let updatedBlogPost : BlogPost = {
      blogPost with
      id;
    };
    blogPosts.add(id, updatedBlogPost);
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    requireAdmin(caller);
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post not found");
    };
    blogPosts.remove(id);
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostById(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?blogPost) { blogPost };
    };
  };

  // Services
  public shared ({ caller }) func createService(service : Service) : async () {
    requireAdmin(caller);
    let newService : Service = {
      service with
      id = nextServiceId;
    };
    services.add(nextServiceId, newService);
    nextServiceId += 1;
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  // Contact Submissions
  public shared ({ caller }) func submitContactForm(contact : ContactSubmission) : async () {
    let newContact : ContactSubmission = {
      contact with
      timestamp = Time.now();
    };
    contactSubmissions.add(nextContactId, newContact);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  // Newsletter Subscribers
  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async () {
    if (email.size() == 0) { Runtime.trap("Email cannot be empty") };
    let newSubscriber : NewsletterSubscriber = {
      email;
      timestamp = Time.now();
    };
    newsletterSubscribers.add(email, newSubscriber);
  };

  public query ({ caller }) func getAllNewsletterSubscribers() : async [NewsletterSubscriber] {
    newsletterSubscribers.values().toArray();
  };

  func requireAdmin(caller : Principal) {
    if (caller != adminPrincipal) {
      Runtime.trap("Unauthorized: Admin access required");
    };
  };

  // Seed Data
  system func preupgrade() { };
  system func postupgrade() {
    products.add(
      1,
      {
        id = 1;
        name = "Engine Oil";
        category = "Engine";
        price = 29.99;
        description = "High-quality engine oil for optimal performance.";
        imageUrl = "/images/engine_oil.jpg";
        rating = 4.5;
        featured = true;
      },
    );
    products.add(
      2,
      {
        id = 2;
        name = "Brake Pads";
        category = "Brake";
        price = 49.99;
        description = "Durable brake pads for safe stopping.";
        imageUrl = "/images/brake_pads.jpg";
        rating = 4.7;
        featured = true;
      },
    );
    products.add(
      3,
      {
        id = 3;
        name = "Car Battery";
        category = "Electrical";
        price = 89.99;
        description = "Long-lasting car battery for reliable starts.";
        imageUrl = "/images/car_battery.jpg";
        rating = 4.8;
        featured = false;
      },
    );
    products.add(
      4,
      {
        id = 4;
        name = "Suspension Kit";
        category = "Suspension";
        price = 199.99;
        description = "Complete suspension kit for smooth rides.";
        imageUrl = "/images/suspension_kit.jpg";
        rating = 4.6;
        featured = true;
      },
    );
    products.add(
      5,
      {
        id = 5;
        name = "Car Floor Mats";
        category = "Accessories";
        price = 39.99;
        description = "Premium car floor mats for protection.";
        imageUrl = "/images/car_floor_mats.jpg";
        rating = 4.4;
        featured = false;
      },
    );

    blogPosts.add(
      1,
      {
        id = 1;
        title = "Car Maintenance Tips";
        excerpt = "Learn how to keep your car in top shape with our maintenance tips.";
        content = "Full blog post content here...";
        date = "2023-05-01";
        imageUrl = "/images/maintenance_tips.jpg";
      },
    );
    blogPosts.add(
      2,
      {
        id = 2;
        title = "Brake System Guide";
        excerpt = "Everything you need to know about brake systems.";
        content = "Full blog post content here...";
        date = "2023-06-15";
        imageUrl = "/images/brake_guide.jpg";
      },
    );
    blogPosts.add(
      3,
      {
        id = 3;
        title = "Car Detailing Basics";
        excerpt = "Get started with car detailing using our guide.";
        content = "Full blog post content here...";
        date = "2023-07-20";
        imageUrl = "/images/detailing_basics.jpg";
      },
    );

    services.add(
      1,
      {
        id = 1;
        name = "Oil Change";
        description = "Professional oil change service for all car models.";
        icon = "oil_change_icon";
      },
    );
    services.add(
      2,
      {
        id = 2;
        name = "Brake Inspection";
        description = "Comprehensive brake system inspection and maintenance.";
        icon = "brake_inspection_icon";
      },
    );
    services.add(
      3,
      {
        id = 3;
        name = "Battery Replacement";
        description = "Fast and reliable car battery replacement service.";
        icon = "battery_replacement_icon";
      },
    );
    services.add(
      4,
      {
        id = 4;
        name = "Car Detailing";
        description = "Complete car detailing for a clean and shiny look.";
        icon = "car_detailing_icon";
      },
    );

    nextProductId := 6;
    nextBlogPostId := 4;
    nextServiceId := 5;
  };
};
