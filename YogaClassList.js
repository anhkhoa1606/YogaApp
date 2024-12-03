import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { database } from "./firebaseconfig";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const YogaClassList = () => {
  const [yogaClasses, setYogaClasses] = useState([]); // Dữ liệu lớp học
  const [filteredClasses, setFilteredClasses] = useState([]); // Lớp học sau khi tìm kiếm
  const [searchTeacher, setSearchTeacher] = useState(""); // Tìm kiếm theo tên giáo viên
  const [searchDate, setSearchDate] = useState(""); // Tìm kiếm theo ngày lớp học
  const navigation = useNavigation();

  // Lấy dữ liệu về lớp học từ Firebase
  useEffect(() => {
    const reference = ref(database, "/YogaCourses");

    const unsubscribe = onValue(reference, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).flatMap(([courseKey, course]) => {
          if (course.classes) {
            return Object.entries(course.classes).map(([classKey, yogaClass]) => ({
              ...yogaClass,
              classId: yogaClass.classId || classKey,
              courseId: course.courseId,
            }));
          }
          return [];
        });

        setYogaClasses(data); // Set lớp học vào state
        setFilteredClasses(data); // Set lớp học ban đầu để hiển thị
      } else {
        console.log("No data available in /YogaCourses");
      }
    });

    return () => unsubscribe();
  }, []);

  // Hàm lọc lớp học
  const handleSearch = () => {
    const filteredData = yogaClasses.filter((yogaClass) => {
      const matchesTeacher =
        searchTeacher && yogaClass.teacher
          ? yogaClass.teacher.toLowerCase().includes(searchTeacher.toLowerCase())
          : true;

      const matchesDate =
        searchDate && yogaClass.date ? yogaClass.date.includes(searchDate) : true;

      return matchesTeacher && matchesDate;
    });

    setFilteredClasses(filteredData); // Cập nhật danh sách lớp học đã lọc
  };

  return (
    <View style={styles.container}>
      {/* Tìm kiếm theo tên giáo viên */}
      <TextInput
        style={styles.input}
        placeholder="Search by teacher's name"
        value={searchTeacher}
        onChangeText={setSearchTeacher}
      />
      {/* Tìm kiếm theo ngày */}
      <TextInput
        style={styles.input}
        placeholder="Search by date (e.g., 2024-11-26)"
        value={searchDate}
        onChangeText={setSearchDate}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Danh sách các lớp học */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.classId.toString()}
        renderItem={({ item }) => (
          <View style={styles.classCard}>
            {Object.entries(item).map(([key, value]) => (
              <Text key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value || "N/A"}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={<Text>No classes found based on your search.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  classCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default YogaClassList;
