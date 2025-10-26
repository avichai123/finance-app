import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TransactionItem({ item, onDelete }) {
  return (
    <View style={[styles.card, item.type === "תשלום" && styles.installmentCard]}>
      <View>
        <Text style={styles.category}>{item.title}</Text>
        <Text style={styles.notes}>{item.notes}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString("he-IL")}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text
          style={[
            styles.amount,
            item.type === "תשלום" ? styles.installmentAmount : styles.transactionAmount,
          ]}
        >
          ₪{item.amount}
        </Text>
        <Text style={styles.typeTag}>
          {item.type === "תשלום" ? "תשלום" : "עסקה"}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  installmentCard: {
    backgroundColor: "#f0f8ff",
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notes: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 13,
    color: "#999",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  installmentAmount: {
    color: "#007AFF",
  },
  transactionAmount: {
    color: "#E63946",
  },
  typeTag: {
    fontSize: 12,
    color: "#666",
  },
  delete: {
    marginTop: 5,
    fontSize: 18,
  },
});
