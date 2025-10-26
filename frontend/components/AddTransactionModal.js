import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  I18nManager,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getUserDetails, getUserToken } from "../utils/authStorage";
import { addTransaction } from "../api/transaction";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function AddTransactionModal({ visible, onClose, onAdd }) {
  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [installments, setInstallments] = useState("1");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    { id: 1, label: "מזון 🍔", color: "#FF7043" },
    { id: 2, label: "שכירות 🏠", color: "#8E24AA" },
    { id: 3, label: "משכורת 💼", color: "#43A047" },
    { id: 4, label: "בגדים 👕", color: "#1E88E5" },
    { id: 5, label: "בילוי 🎉", color: "#FB8C00" },
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSave = async () => {
    if (!categoryId || !amount) {
      Alert.alert("שגיאה", "אנא מלא את כל השדות הדרושים.");
      return;
    }

    try {
      const token = await getUserToken();
      const user = await getUserDetails();
      const userId = user?.id;

      const newTransaction = {
        userId,
        type,
        categoryId,
        amount: parseFloat(amount),
        date: date.toISOString().split("T")[0],
        notes,
        installment: Number(installments) || 1,
      };

      const created = await addTransaction(token, newTransaction);
      onAdd(created);
      onClose();

      setType("expense");
      setCategoryId(null);
      setAmount("");
      setDate(new Date());
      setNotes("");
      setInstallments("1");
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to add transaction");
    }
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <Modal visible={visible} animationType="fade" presentationStyle="overFullScreen">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <KeyboardAvoidingView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>💸 הוספת פעולה</Text>

            {/* סוג פעולה */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  type === "expense" && styles.activeExpense,
                ]}
                onPress={() => setType("expense")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    type === "expense" && styles.activeText,
                  ]}
                >
                  הוצאה
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  type === "income" && styles.activeIncome,
                ]}
                onPress={() => setType("income")}
              >
                <Text
                  style={[
                    styles.toggleText,
                    type === "income" && styles.activeText,
                  ]}
                >
                  הכנסה
                </Text>
              </TouchableOpacity>
            </View>

            {/* קטגוריה */}
            <Text style={styles.label}>קטגוריה</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={{ color: selectedCategory ? "#000" : "#aaa" }}>
                {selectedCategory ? selectedCategory.label : "בחר קטגוריה"}
              </Text>
            </TouchableOpacity>

            {/* Modal של קטגוריות */}
            <Modal
              visible={showCategoryModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowCategoryModal(false)}
            >
              <View style={styles.categoryModalOverlay}>
                <View style={styles.categoryModal}>
                  <Text style={styles.categoryTitle}>בחר קטגוריה</Text>
                  <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[styles.categoryItem, { borderLeftColor: item.color }]}
                        onPress={() => {
                          setCategoryId(item.id);
                          setShowCategoryModal(false);
                        }}
                      >
                        <Text style={styles.categoryText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => setShowCategoryModal(false)}
                    style={styles.cancelCategory}
                  >
                    <Text style={{ color: "red", fontSize: 16 }}>ביטול</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* סכום */}
            <Text style={styles.label}>סכום</Text>
            <TextInput
              style={styles.input}
              placeholder="₪ 0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />

            {/* תאריך */}
            <Text style={styles.label}>תאריך</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.selector}
            >
              <Text style={{ color: "#000" }}>
                {date.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* תשלומים */}
            <Text style={styles.label}>תשלומים</Text>
            <TextInput
              style={styles.input}
              placeholder="מספר תשלומים (ברירת מחדל 1)"
              value={installments}
              onChangeText={(v) => setInstallments(v.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />

            {/* הערות */}
            <Text style={styles.label}>הערות</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="הוסף הערה (אופציונלי)"
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholderTextColor="#aaa"
            />

            {/* כפתורים */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.btn, styles.saveBtn]}
                onPress={handleSave}
              >
                <Text style={styles.btnText}>💾 שמירה</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={onClose}
              >
                <Text style={styles.btnText}>✖ ביטול</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    width: "92%",
    maxHeight: "88%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#007AFF",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    textAlign: "right",
    color: "#444",
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
    backgroundColor: "#fafafa",
    fontSize: 16,
    color: "#000",
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  toggleText: {
    color: "#555",
    fontWeight: "600",
  },
  activeExpense: {
    backgroundColor: "#FFEBEE",
  },
  activeIncome: {
    backgroundColor: "#E8F5E9",
  },
  activeText: {
    color: "#007AFF",
    fontWeight: "700",
  },
  categoryModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  categoryModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  categoryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderLeftWidth: 6,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
  },
  cancelCategory: {
    paddingVertical: 12,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    flex: 1,
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
  },
  cancelBtn: {
    backgroundColor: "#999",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
