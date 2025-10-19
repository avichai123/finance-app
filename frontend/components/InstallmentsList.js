import { View, Text, StyleSheet } from "react-native";

export default function InstallmentsList({ installments }) {
  return (
    <View style={styles.container}>
      {installments?.map((inst, index) => (
        <View key={index} style={styles.item}>
          <Text>תשלום {index + 1}: {inst.amount}₪</Text>
          <Text>תאריך: {new Date(inst.dueDate).toLocaleDateString()}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eef3f7",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
  },
});
