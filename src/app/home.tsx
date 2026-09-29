import React, { useRef } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const categories = [
  { id: "1", title: "Home\nCleaning", icon: "sparkles-outline" as const },
  { id: "2", title: "Plumbing", icon: "water-outline" as const },
  { id: "3", title: "Electrical", icon: "flash-outline" as const },
  { id: "4", title: "Beauty", icon: "cut-outline" as const },
  { id: "5", title: "Moving", icon: "cube-outline" as const },
  { id: "6", title: "Tech", icon: "laptop-outline" as const },
];

const providers = [
  {
    id: "1",
    name: "Samuel Tech",
    service: "Computer & Phone Repair",
    rating: "4.9",
    reviews: "128",
    price: "From $15",
    icon: "laptop-outline" as const,
    available: true,
  },
  {
    id: "2",
    name: "Mekdes Cleaning",
    service: "Home Cleaning Service",
    rating: "4.8",
    reviews: "94",
    price: "From $12",
    icon: "sparkles-outline" as const,
    available: true,
  },
  {
    id: "3",
    name: "Daniel Electric",
    service: "Electrical Installation",
    rating: "4.9",
    reviews: "76",
    price: "From $20",
    icon: "flash-outline" as const,
    available: false,
  },
];

export default function HomeScreen() {
  const renderProvider = ({ item }: { item: (typeof providers)[0] }) => (
    <Pressable style={styles.providerCard} onPress={() => {}}>
      <View style={styles.providerImageContainer}>
        <View style={styles.providerAvatar}>
          <Ionicons name={item.icon} size={32} color="#2563EB" />
        </View>

        {item.available && (
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Available</Text>
          </View>
        )}

        <Pressable style={styles.heartButton}>
          <Ionicons name="heart-outline" size={19} color="#0F172A" />
        </Pressable>
      </View>

      <View style={styles.providerInfo}>
        <View style={styles.providerNameRow}>
          <Text style={styles.providerName} numberOfLines={1}>
            {item.name}
          </Text>

          <Ionicons name="checkmark-circle" size={17} color="#2563EB" />
        </View>

        <Text style={styles.providerService} numberOfLines={1}>
          {item.service}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={15} color="#F59E0B" />

          <Text style={styles.rating}>{item.rating}</Text>

          <Text style={styles.reviewCount}>({item.reviews})</Text>

          <View style={styles.priceSpacer} />

          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={15} color="#2563EB" />

              <Text style={styles.locationLabel}>Your location</Text>

              <Ionicons name="chevron-down" size={13} color="#64748B" />
            </View>

            <Text style={styles.location}>Wolkite, Ethiopia</Text>
          </View>

          <Pressable style={styles.notificationButton} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={24} color="#0F172A" />

            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* GREETING */}
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>Good morning, Abdulsemed 👋</Text>

            <Text style={styles.question}>What service do you need today?</Text>
          </View>

          {/* SEARCH */}
          <Pressable style={styles.searchBar} onPress={() => {}}>
            <View style={styles.searchIconContainer}>
              <Ionicons name="search" size={21} color="#2563EB" />
            </View>

            <Text style={styles.searchPlaceholder}>
              Search for a service...
            </Text>

            <View style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#FFFFFF" />
            </View>
          </Pressable>

          {/* CATEGORIES */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse categories</Text>

            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item, index }) => (
              <Pressable style={styles.categoryItem}>
                <View
                  style={[
                    styles.categoryIcon,
                    index === 0 && styles.categoryIconActive,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={25}
                    color={index === 0 ? "#FFFFFF" : "#2563EB"}
                  />
                </View>

                <Text
                  style={[
                    styles.categoryText,
                    index === 0 && styles.categoryTextActive,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            )}
          />

          {/* FEATURED BANNER */}
          <View style={styles.featuredBanner}>
            <View style={styles.bannerContent}>
              <View style={styles.offerBadge}>
                <Ionicons name="flash" size={13} color="#2563EB" />

                <Text style={styles.offerBadgeText}>SPECIAL OFFER</Text>
              </View>

              <Text style={styles.bannerTitle}>
                Get 20% off{`\n`}your first booking
              </Text>

              <Text style={styles.bannerSubtitle}>
                Discover trusted professionals near you.
              </Text>

              <Pressable style={styles.exploreButton}>
                <Text style={styles.exploreText}>Explore services</Text>

                <Ionicons name="arrow-forward" size={17} color="#2563EB" />
              </Pressable>
            </View>

            <View style={styles.bannerVisual}>
              <View style={styles.bannerCircleLarge} />
              <View style={styles.bannerCircleSmall}>
                <Ionicons name="construct-outline" size={42} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* POPULAR PROVIDERS */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Popular near you</Text>

              <Text style={styles.sectionSubtitle}>
                Highly rated professionals
              </Text>
            </View>

            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={providers}
            keyExtractor={(item) => item.id}
            renderItem={renderProvider}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.77}
            decelerationRate="fast"
            contentContainerStyle={styles.providerList}
          />

          {/* TRUST SECTION */}
          <View style={styles.trustCard}>
            <View style={styles.trustIcon}>
              <Ionicons name="shield-checkmark" size={27} color="#2563EB" />
            </View>

            <View style={styles.trustContent}>
              <Text style={styles.trustTitle}>Book with confidence</Text>

              <Text style={styles.trustText}>
                Verified professionals, transparent pricing, and secure
                bookings.
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem}>
            <View style={styles.activeNavIcon}>
              <Ionicons name="home" size={22} color="#FFFFFF" />
            </View>

            <Text style={styles.activeNavText}>Home</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <Ionicons name="calendar-outline" size={23} color="#64748B" />

            <Text style={styles.navText}>Bookings</Text>
          </Pressable>

          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </Pressable>

          <Pressable style={styles.navItem}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={23}
              color="#64748B"
            />

            <Text style={styles.navText}>Messages</Text>
          </Pressable>

          <Pressable style={styles.navItem} onPress={() => {}}>
            <Ionicons name="person-outline" size={23} color="#64748B" />

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
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  locationLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },

  location: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    position: "absolute",
    right: 11,
    top: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  greetingSection: {
    marginTop: 12,
    marginBottom: 18,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 5,
    fontWeight: "500",
  },

  question: {
    fontSize: 25,
    lineHeight: 32,
    color: "#0F172A",
    fontWeight: "800",
    maxWidth: 340,
  },

  searchBar: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 28,
  },

  searchIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  searchPlaceholder: {
    flex: 1,
    color: "#94A3B8",
    fontSize: 14,
  },

  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },

  categoryList: {
    gap: 17,
    paddingBottom: 28,
  },

  categoryItem: {
    alignItems: "center",
    width: 67,
  },

  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  categoryIconActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  categoryText: {
    fontSize: 10.5,
    lineHeight: 14,
    textAlign: "center",
    color: "#64748B",
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "#2563EB",
    fontWeight: "800",
  },

  featuredBanner: {
    minHeight: 190,
    borderRadius: 25,
    backgroundColor: "#2563EB",
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 30,
  },

  bannerContent: {
    flex: 1,
    padding: 21,
    zIndex: 2,
  },

  offerBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 11,
  },

  offerBadgeText: {
    fontSize: 9,
    color: "#2563EB",
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  bannerTitle: {
    fontSize: 21,
    lineHeight: 25,
    color: "#FFFFFF",
    fontWeight: "900",
  },

  bannerSubtitle: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 16,
    color: "#DBEAFE",
    maxWidth: 220,
  },

  exploreButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  exploreText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "800",
  },

  bannerVisual: {
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },

  bannerCircleLarge: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#3B82F6",
    right: -70,
  },

  bannerCircleSmall: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },

  providerList: {
    gap: 14,
    paddingBottom: 25,
  },

  providerCard: {
    width: width * 0.72,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  providerImageContainer: {
    height: 125,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  providerAvatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  onlineBadge: {
    position: "absolute",
    left: 12,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
  },

  onlineText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#166534",
  },

  heartButton: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  providerInfo: {
    padding: 14,
  },

  providerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  providerName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    maxWidth: 145,
  },

  providerService: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 4,
  },

  ratingRow: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },

  reviewCount: {
    marginLeft: 3,
    fontSize: 11,
    color: "#94A3B8",
  },

  priceSpacer: {
    flex: 1,
  },

  price: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
  },

  trustCard: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  trustIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  trustContent: {
    flex: 1,
  },

  trustTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  trustText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#64748B",
  },

  bottomNav: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    height: 72,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  navItem: {
    width: 62,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
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
    fontWeight: "800",
    color: "#2563EB",
  },

  navText: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "600",
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
