import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: string;
  reviews: string;
  icon: keyof typeof Ionicons.glyphMap;
  popular?: boolean;
};

const categories = [
  "All",
  "Cleaning",
  "Technology",
  "Electrical",
  "Beauty",
  "Moving",
];

const services: Service[] = [
  {
    id: "1",
    name: "Home Cleaning",
    category: "Cleaning",
    description: "Professional home cleaning",
    price: "From $12",
    rating: "4.9",
    reviews: "128",
    icon: "sparkles-outline",
    popular: true,
  },
  {
    id: "2",
    name: "Computer Repair",
    category: "Technology",
    description: "Laptop & computer repair",
    price: "From $15",
    rating: "4.9",
    reviews: "96",
    icon: "laptop-outline",
    popular: true,
  },
  {
    id: "3",
    name: "Phone Repair",
    category: "Technology",
    description: "Screen & hardware repair",
    price: "From $10",
    rating: "4.8",
    reviews: "84",
    icon: "phone-portrait-outline",
    price: "From $10",
  },
  {
    id: "4",
    name: "Electrical Repair",
    category: "Electrical",
    description: "Home electrical services",
    price: "From $20",
    rating: "4.9",
    reviews: "76",
    icon: "flash-outline",
    popular: true,
  },
  {
    id: "5",
    name: "Hair & Beauty",
    category: "Beauty",
    description: "Professional beauty services",
    price: "From $10",
    rating: "4.8",
    reviews: "65",
    icon: "cut-outline",
  },
  {
    id: "6",
    name: "Moving Service",
    category: "Moving",
    description: "Reliable moving assistance",
    price: "From $25",
    rating: "4.7",
    reviews: "53",
    icon: "cube-outline",
  },
  {
    id: "7",
    name: "Web Development",
    category: "Technology",
    description: "Websites & web applications",
    price: "From $50",
    rating: "5.0",
    reviews: "42",
    icon: "code-slash-outline",
  },
  {
    id: "8",
    name: "Plumbing",
    category: "Electrical",
    description: "Professional plumbing service",
    price: "From $18",
    rating: "4.8",
    reviews: "71",
    icon: "water-outline",
  },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const categoryMatch =
        selectedCategory === "All" || service.category === selectedCategory;

      const searchMatch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const renderService = ({ item }: { item: Service }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <Pressable
        style={styles.serviceCard}
        onPress={() => router.push("/service-details")}
      >
        <View style={styles.serviceVisual}>
          <View style={styles.serviceIcon}>
            <Ionicons name={item.icon} size={31} color="#2563EB" />
          </View>

          {item.popular && (
            <View style={styles.popularBadge}>
              <Ionicons name="flame" size={11} color="#FFFFFF" />
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}

          <Pressable
            style={styles.favoriteButton}
            onPress={(event) => {
              event.stopPropagation();
              toggleFavorite(item.id);
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={19}
              color={isFavorite ? "#EF4444" : "#334155"}
            />
          </Pressable>
        </View>

        <View style={styles.serviceContent}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.serviceDescription} numberOfLines={1}>
            {item.description}
          </Text>

          <View style={styles.serviceBottom}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#F59E0B" />

              <Text style={styles.rating}>{item.rating}</Text>

              <Text style={styles.reviews}>({item.reviews})</Text>
            </View>

            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Services</Text>

            <Text style={styles.headerSubtitle}>
              Find the right professional
            </Text>
          </View>

          <Pressable style={styles.filterButton}>
            <Ionicons name="options-outline" size={21} color="#0F172A" />
          </Pressable>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={21} color="#64748B" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search services..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        {/* CATEGORIES */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Categories</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryChip,
                    active && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      active && styles.categoryChipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* RESULT HEADER */}
        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.resultTitle}>
              {selectedCategory === "All"
                ? "Popular services"
                : selectedCategory}
            </Text>

            <Text style={styles.resultCount}>
              {filteredServices.length} services available
            </Text>
          </View>

          <Pressable style={styles.sortButton}>
            <Ionicons name="swap-vertical" size={16} color="#2563EB" />

            <Text style={styles.sortText}>Sort</Text>
          </Pressable>
        </View>

        {/* SERVICES */}
        {filteredServices.length > 0 ? (
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id}
            renderItem={renderService}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.serviceList}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
          />
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="search-outline" size={38} color="#2563EB" />
            </View>

            <Text style={styles.emptyTitle}>No services found</Text>

            <Text style={styles.emptyText}>
              Try another search or choose a different category.
            </Text>

            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              <Text style={styles.clearButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        )}

        {/* BOTTOM NAV */}
        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navItem}
            onPress={() => router.replace("/home")}
          >
            <Ionicons name="home-outline" size={22} color="#64748B" />
            <Text style={styles.navText}>Home</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <View style={styles.activeNavIcon}>
              <Ionicons name="grid" size={20} color="#FFFFFF" />
            </View>

            <Text style={styles.activeNavText}>Services</Text>
          </Pressable>

          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </Pressable>

          <Pressable style={styles.navItem}>
            <Ionicons name="calendar-outline" size={22} color="#64748B" />
            <Text style={styles.navText}>Bookings</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <Ionicons name="person-outline" size={22} color="#64748B" />
            <Text style={styles.navText}>Profile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  filterButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    height: 56,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },

  categorySection: {
    marginTop: 23,
  },

  categoryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 11,
  },

  categoryList: {
    gap: 8,
    paddingRight: 20,
  },

  categoryChip: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
  },

  categoryChipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  categoryChipText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "700",
  },

  categoryChipTextActive: {
    color: "#FFFFFF",
  },

  resultHeader: {
    marginTop: 24,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultTitle: {
    fontSize: 18,
    color: "#0F172A",
    fontWeight: "800",
  },

  resultCount: {
    marginTop: 3,
    fontSize: 11,
    color: "#94A3B8",
  },

  sortButton: {
    height: 35,
    paddingHorizontal: 11,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  sortText: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "800",
  },

  serviceList: {
    paddingBottom: 110,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  serviceCard: {
    width: "48.3%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  serviceVisual: {
    height: 120,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  serviceIcon: {
    width: 67,
    height: 67,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  popularBadge: {
    position: "absolute",
    left: 9,
    top: 9,
    borderRadius: 9,
    backgroundColor: "#2563EB",
    paddingHorizontal: 7,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  popularText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
  },

  favoriteButton: {
    position: "absolute",
    right: 9,
    top: 9,
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  serviceContent: {
    padding: 12,
  },

  serviceName: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "800",
  },

  serviceDescription: {
    marginTop: 4,
    fontSize: 10.5,
    color: "#64748B",
  },

  serviceBottom: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rating: {
    marginLeft: 3,
    fontSize: 10.5,
    color: "#0F172A",
    fontWeight: "800",
  },

  reviews: {
    marginLeft: 2,
    fontSize: 9,
    color: "#94A3B8",
  },

  price: {
    fontSize: 10.5,
    color: "#2563EB",
    fontWeight: "800",
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  emptyText: {
    marginTop: 7,
    maxWidth: 280,
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },

  clearButton: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },

  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },

  navItem: {
    width: 62,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  navText: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "600",
  },

  activeNavIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavText: {
    fontSize: 9,
    color: "#2563EB",
    fontWeight: "800",
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
    borderWidth: 4,
    borderColor: "#F8FAFC",
  },
});
