import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getUserToken } from "../utils/authStorage";
import { getAllTransaction, deleteTransaction } from "../api/transaction";
import TransactionItem from "../components/TransactionItem";
import EmptyState from "../components/EmptyState";
import AddTransactionModal from "../components/AddTransactionModal";
import { Picker } from "@react-native-picker/picker";

export default function TransactionScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
  try {
    const token = await getUserToken();
    if (!token) {
      Alert.alert("Session expired", "Please log in again.");
      router.replace("/login");
      return;
    }

    const data = await getAllTransaction(token);

    const merged = [
      ...data.transactions.map(t => ({
        id: `t-${t.id}`,
        title: t.Category?.name || "ללא קטגוריה",
        amount: t.amount,
        date: new Date(t.date),
        notes: t.notes,
        type: "עסקה"
      })),
      ...data.installments.map(i => ({
        id: `i-${i.id}`,
        title: i.Transaction?.Category?.name || "ללא קטגוריה",
        amount: i.amount,
        date: new Date(i.dueDate),
        notes: i.Transaction?.notes,
        type: "תשלום"
      }))
    ];

    merged.sort((a, b) => b.date - a.date);

    setTransactions(merged);
  } catch (error) {
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await getUserToken();
            await deleteTransaction(id, token);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  if (loading) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {transactions.length === 0 ? (
        <EmptyState message="There are no transactions yet!" />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
        />
      )}

      <Button title="Add Transaction" onPress={() => setModalVisible(true)} />

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 , marginTop:20},
  loading: { marginTop: 50, textAlign: "center", fontSize: 18 },
});
