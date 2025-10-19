import { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import InstallmentsList from "./InstallmentsList";

export default function TransactionItem({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.transaction}>
      <Text style={styles.type}>
        {item.type}: {item.amount}₪
      </Text>
      <Text>{new Date(item.date).toLocaleDateString()}</Text>
      <Text>קטגוריה: {item.category}</Text>
      <Text>הערה: {item.notes}</Text>

      {item.hasInstallments && (
        <>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.toggleBtn}>
              {expanded ? "הסתר תשלומים ▲" : "הצג תשלומים ▼"}
            </Text>
          </TouchableOpacity>

          {expanded && (
            <InstallmentsList installments={item.installments} />
          )}
        </>
      )}

      <Button title="מחק" color="red" onPress={() => onDelete(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  type: { fontWeight: "bold" },
  toggleBtn: {
    color: "#007AFF",
    marginTop: 8,
    fontWeight: "600",
  },
});
