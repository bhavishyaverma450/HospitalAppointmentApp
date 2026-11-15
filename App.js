
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert, StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

// Dummy hospital and doctor data
const hospitals = [
  {
    id: 'H001',
    name: 'City Care Hospital',
    address: 'Model Town, Ludhiana',
    doctors: [
      { id: 'D001', name: 'Dr. Rahul Sharma', speciality: 'Cardiologist', fee: 500 },
      { id: 'D002', name: 'Dr. Neha Gupta', speciality: 'Dermatologist', fee: 400 },
    ],
  },
  {
    id: 'H002',
    name: 'Apollo Hospital',
    address: 'Ferozepur Road, Ludhiana',
    doctors: [
      { id: 'D003', name: 'Dr. Amit Verma', speciality: 'Neurologist', fee: 600 },
      { id: 'D004', name: 'Dr. Priya Singh', speciality: 'Pediatrician', fee: 450 },
    ],
  },
  {
    id: 'H003',
    name: 'Fortis Hospital',
    address: 'Bharat Nagar, Ludhiana',
    doctors: [
      { id: 'D005', name: 'Dr. Karan Mehta', speciality: 'Orthopedic', fee: 550 },
    ],
  },
];

const dates = [
  { day: 'Mon', date: '16' },
  { day: 'Tue', date: '17' },
  { day: 'Wed', date: '18' },
  { day: 'Thu', date: '19' },
  { day: 'Fri', date: '20' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM',
];

// Reusable heading
function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function RoleScreen({ navigation }) {
  return (
    <View style={styles.roleContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />

      <View style={styles.logoCircle}>
        <Ionicons name="medkit" size={42} color="#FFFFFF" />
      </View>

      <Text style={styles.appTitle}>MediBook</Text>
      <Text style={styles.roleSubtitle}>
        Your health, our priority.
        {'\n'}Book appointments with ease.
      </Text>

      <Text style={styles.chooseText}>Continue as</Text>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => navigation.navigate('Patient')}
      >
        <View style={[styles.roleIcon, { backgroundColor: '#E5F0FF' }]}>
          <Ionicons name="person" size={28} color="#2878E5" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.roleName}>Patient</Text>
          <Text style={styles.roleDescription}>
            Find doctors and book appointments
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#2878E5" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => navigation.navigate('Doctor')}
      >
        <View style={[styles.roleIcon, { backgroundColor: '#E4F7EF' }]}>
          <Ionicons name="medkit" size={28} color="#18A36B" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.roleName}>Doctor</Text>
          <Text style={styles.roleDescription}>
            View and manage your appointments
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#18A36B" />
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Healthcare made simpler with MediBook
      </Text>
    </View>
  );
}

function PatientScreen({ navigation }) {
  const [hospital, setHospital] = useState(hospitals[0]);
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const handleBooking = () => {
    if (!doctor || !selectedDate || !selectedTime ||
        !patientName.trim() || !age.trim() || !phone.trim()) {
      Alert.alert('Missing details', 'Please complete all required fields.');
      return;
    }

    Alert.alert(
      'UI Demo',
      'Your booking details are ready. Appointment saving will be implemented in the next phase.'
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Patient 👋</Text>
          <Text style={styles.headerSubtitle}>Book your appointment</Text>
        </View>
        <View style={styles.profileCircle}>
          <Ionicons name="person" size={23} color="#2878E5" />
        </View>
      </View>

      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Your health matters!</Text>
          <Text style={styles.bannerText}>
            Find the right doctor for your needs.
          </Text>
        </View>
        <Ionicons name="heart" size={48} color="#FFFFFF" />
      </View>

      <SectionTitle title="Select Hospital" subtitle="Choose your preferred hospital" />

      {hospitals.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.hospitalCard,
            hospital.id === item.id && styles.selectedCard
          ]}
          onPress={() => {
            setHospital(item);
            setDoctor(null);
          }}
        >
          <View style={styles.hospitalIcon}>
            <Ionicons name="business" size={25} color="#2878E5" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.address}</Text>
          </View>
          <Ionicons
            name={hospital.id === item.id ? 'checkmark-circle' : 'ellipse-outline'}
            size={23}
            color="#2878E5"
          />
        </TouchableOpacity>
      ))}

      <SectionTitle title="Available Doctors" subtitle={`Doctors at ${hospital.name}`} />

      {hospital.doctors.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.doctorCard,
            doctor?.id === item.id && styles.selectedCard
          ]}
          onPress={() => setDoctor(item)}
        >
          <View style={styles.doctorAvatar}>
            <Ionicons name="person" size={27} color="#2878E5" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.speciality}</Text>
            <Text style={styles.fee}>Consultation: ₹{item.fee}</Text>
          </View>
          <Ionicons
            name={doctor?.id === item.id ? 'checkmark-circle' : 'add-circle-outline'}
            size={24}
            color="#2878E5"
          />
        </TouchableOpacity>
      ))}

      <SectionTitle title="Select Date" subtitle="Choose an appointment date" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map(item => (
          <TouchableOpacity
            key={item.date}
            style={[
              styles.dateCard,
              selectedDate === item.date && styles.activeDate
            ]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={[
              styles.dateDay,
              selectedDate === item.date && styles.activeText
            ]}>{item.day}</Text>
            <Text style={[
              styles.dateNumber,
              selectedDate === item.date && styles.activeText
            ]}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionTitle title="Available Time Slots" subtitle="Select a convenient time" />

      <View style={styles.timeContainer}>
        {timeSlots.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeCard,
              selectedTime === time && styles.activeDate
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[
              styles.timeText,
              selectedTime === time && styles.activeText
            ]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionTitle title="Patient Details" subtitle="Enter your information" />

      <Text style={styles.inputLabel}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter patient name"
        value={patientName}
        onChangeText={setPatientName}
      />

      <Text style={styles.inputLabel}>Age *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.inputLabel}>Phone Number *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={10}
      />

      <Text style={styles.inputLabel}>Reason for Visit</Text>
      <TextInput
        style={[styles.input, styles.reasonInput]}
        placeholder="Describe your health concern"
        multiline
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Appointment</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back to Role Selection</Text>
      </TouchableOpacity>

      <View style={{ height: 35 }} />
    </ScrollView>
  );
}

function DoctorScreen({ navigation }) {
  const [appointments, setAppointments] = useState([
    {
      id: 'A001',
      patient: 'Aman Verma',
      age: 25,
      time: '10:00 AM',
      date: '18 Nov 2026',
      reason: 'Regular checkup',
      status: 'Pending',
    },
    {
      id: 'A002',
      patient: 'Priya Sharma',
      age: 30,
      time: '11:00 AM',
      date: '18 Nov 2026',
      reason: 'Headache',
      status: 'Confirmed',
    },
    {
      id: 'A003',
      patient: 'Rahul Singh',
      age: 42,
      time: '02:00 PM',
      date: '19 Nov 2026',
      reason: 'General consultation',
      status: 'Pending',
    },
  ]);

  const updateStatus = (id, status) => {
    setAppointments(previous =>
      previous.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const pending = appointments.filter(a => a.status === 'Pending').length;
  const confirmed = appointments.filter(a => a.status === 'Confirmed').length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Doctor Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome, Dr. Rahul Sharma</Text>
        </View>
        <View style={[styles.profileCircle, { backgroundColor: '#E4F7EF' }]}>
          <Ionicons name="medkit" size={23} color="#18A36B" />
        </View>
      </View>

      <View style={styles.doctorProfile}>
        <View style={styles.largeAvatar}>
          <Ionicons name="person" size={35} color="#2878E5" />
        </View>
        <View>
          <Text style={styles.doctorName}>Dr. Rahul Sharma</Text>
          <Text style={styles.cardSubtitle}>Cardiologist</Text>
          <Text style={styles.cardSubtitle}>City Care Hospital</Text>
        </View>
      </View>

      <SectionTitle title="Appointment Overview" subtitle="Your appointment statistics" />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{appointments.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#E69B21' }]}>{pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#18A36B' }]}>{confirmed}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
      </View>

      <SectionTitle title="Patient Appointments" subtitle="Manage your scheduled appointments" />

      {appointments.map(item => (
        <View style={styles.appointmentCard} key={item.id}>
          <View style={styles.appointmentHeader}>
            <View style={styles.patientAvatar}>
              <Ionicons name="person" size={23} color="#2878E5" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.patient}</Text>
              <Text style={styles.cardSubtitle}>Age: {item.age} years</Text>
            </View>
            <View style={[
              styles.statusBadge,
              item.status === 'Confirmed' ? styles.confirmedBadge :
              item.status === 'Completed' ? styles.completedBadge :
              item.status === 'Cancelled' ? styles.cancelledBadge :
              styles.pendingBadge
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.appointmentInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" color="#2878E5" size={17} />
              <Text style={styles.infoText}>{item.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" color="#2878E5" size={17} />
              <Text style={styles.infoText}>{item.time}</Text>
            </View>
          </View>

          <Text style={styles.reasonText}>Reason: {item.reason}</Text>

          {item.status === 'Pending' && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => updateStatus(item.id, 'Confirmed')}
              >
                <Text style={styles.actionText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => updateStatus(item.id, 'Cancelled')}
              >
                <Text style={[styles.actionText, { color: '#E34D59' }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {item.status === 'Confirmed' && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.rescheduleButton}
                onPress={() => Alert.alert('Reschedule', 'Date and time editing will be implemented in the next phase.')}
              >
                <Text style={styles.actionText}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => updateStatus(item.id, 'Completed')}
              >
                <Text style={styles.actionText}>Complete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back to Role Selection</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// APP NAVIGATION
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />
      <Stack.Navigator
        initialRouteName="Role"
        screenOptions={{
          headerStyle: { backgroundColor: '#F5F8FF' },
          headerTintColor: '#183153',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Role"
          component={RoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patient"
          component={PatientScreen}
          options={{ title: 'Book Appointment' }}
        />
        <Stack.Screen
          name="Doctor"
          component={DoctorScreen}
          options={{ title: 'Doctor Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 18,
  },
  roleContainer: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoCircle: {
    width: 85,
    height: 85,
    borderRadius: 25,
    backgroundColor: '#2878E5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#183153',
    textAlign: 'center',
  },
  roleSubtitle: {
    textAlign: 'center',
    color: '#78869B',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 40,
  },
  chooseText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#183153',
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  roleIcon: {
    width: 55,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  roleName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#183153',
  },
  roleDescription: {
    fontSize: 12,
    color: '#7D8A9D',
    marginTop: 5,
  },
  footerText: {
    textAlign: 'center',
    color: '#A1AFC0',
    marginTop: 35,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#183153',
  },
  headerSubtitle: {
    color: '#7D8A9D',
    marginTop: 5,
    fontSize: 13,
  },
  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#E5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: '#2878E5',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bannerText: {
    color: '#E5F0FF',
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 13,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183153',
  },
  subtitle: {
    fontSize: 12,
    color: '#8492A6',
    marginTop: 5,
  },
  hospitalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },
  selectedCard: {
    borderColor: '#2878E5',
    borderWidth: 1.5,
    backgroundColor: '#F0F6FF',
  },
  hospitalIcon: {
    width: 46,
    height: 46,
    backgroundColor: '#E5F0FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#183153',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#8492A6',
    marginTop: 4,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#E5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fee: {
    color: '#2878E5',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  dateCard: {
    width: 62,
    height: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8EDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activeDate: {
    backgroundColor: '#2878E5',
    borderColor: '#2878E5',
  },
  dateDay: {
    fontSize: 12,
    color: '#8492A6',
  },
  dateNumber: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#183153',
    marginTop: 5,
  },
  activeText: {
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeCard: {
    width: '31%',
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8EDF5',
    alignItems: 'center',
  },
  timeText: {
    color: '#183153',
    fontSize: 11,
    fontWeight: '600',
  },
  inputLabel: {
    color: '#183153',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E5EAF2',
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#183153',
  },
  reasonInput: {
    height: 85,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#2878E5',
    borderRadius: 13,
    padding: 16,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#2878E5',
    fontWeight: '600',
  },
  doctorProfile: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  largeAvatar: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: '#E5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#183153',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 9,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingVertical: 17,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2878E5',
  },
  statLabel: {
    color: '#8492A6',
    fontSize: 11,
    marginTop: 5,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientAvatar: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#E5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pendingBadge: {
    backgroundColor: '#FFF2D9',
  },
  confirmedBadge: {
    backgroundColor: '#E4F7EF',
  },
  completedBadge: {
    backgroundColor: '#E5F0FF',
  },
  cancelledBadge: {
    backgroundColor: '#FFE9EB',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#183153',
  },
  appointmentInfo: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    fontSize: 11,
    color: '#64748B',
  },
  reasonText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 13,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#18A36B',
    padding: 11,
    borderRadius: 9,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFE9EB',
    padding: 11,
    borderRadius: 9,
    alignItems: 'center',
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#E5F0FF',
    padding: 11,
    borderRadius: 9,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
