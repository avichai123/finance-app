import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getUserToken } from "../utils/authStorage";
import { getAllTransaction, deleteTransaction } from "../api/transaction";
import TransactionItem from "../components/TransactionItem";
import EmptyState from "../components/EmptyState";

export default function TransactionScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTransactions(data);
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

  if (loading) return <Text style={styles.loading}>Loading...</Text>;

  if (transactions.length === 0)
    return <EmptyState message="There are no transactions yet!" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
      />

      <Button title="Add Transaction" onPress={() => router.push("/addTransaction")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  loading: { marginTop: 50, textAlign: "center", fontSize: 18 },
});
