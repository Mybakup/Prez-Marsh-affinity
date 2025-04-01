import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import DoctorSearch from './pages/DoctorSearch';
import VoiceCommand from './pages/VoiceCommand';
import VoiceCommandV2 from './pages/VoiceCommandV2';
import AppointmentScheduling from './pages/AppointmentScheduling';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import Appointments from './pages/Appointments';
import AppointmentDetails from './pages/AppointmentDetails';
import PendingAppointmentDetails from './pages/PendingAppointmentDetails';
import Profile from './pages/Profile';
import TravelGuide from './pages/TravelGuide';
import MalakoffHumanis from './pages/MalakoffHumanis';
import HealthTips from './pages/HealthTips';
import ProfileChoice from './pages/ProfileChoice';
import InitialProfileChoice from './pages/InitialProfileChoice';
import PractitionerTypeChoice from './pages/PractitionerTypeChoice';
import PractitionerSignup from './pages/PractitionerSignup';
import PractitionerInfo from './pages/PractitionerInfo';
import PractitionerPreview from './pages/PractitionerPreview';
import PractitionerDashboard from './pages/PractitionerDashboard';
import ProfessionalDetails from './pages/ProfessionalDetails';
import Insurance from './pages/Insurance';
import ExpatInsurance from './pages/ExpatInsurance';
import TravelInsurance from './pages/TravelInsurance';
import MedicationTranslator from './pages/MedicationTranslator';
import FacilityDashboard from './pages/FacilityDashboard';
import FacilityRegistration from './pages/FacilityRegistration';
import FacilityStaffManagement from './pages/FacilityStaffManagement';
import MedicalTranslator from './pages/MedicalTranslator';
import PatientHistory from './pages/PatientHistory';
import ChatSupport from './components/ChatSupport';

export default function App() {
  return (
    <div className="h-screen overflow-x-hidden">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<InitialProfileChoice />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<DoctorSearch />} />
        <Route path="/voice-command" element={<VoiceCommand />} />
        <Route path="/voice-command-v2" element={<VoiceCommandV2 />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/insurance/expat" element={<ExpatInsurance />} />
        <Route path="/insurance/travel" element={<TravelInsurance />} />
        <Route path="/translator" element={<MedicationTranslator />} />
        <Route path="/medical-translator" element={<MedicalTranslator />} />
        <Route path="/initial-profile-choice" element={<InitialProfileChoice />} />
        <Route path="/profile-choice" element={<ProfileChoice />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/partner/malakoff-humanis" element={<MalakoffHumanis />} />

        {/* Protected routes */}
        <Route path="/appointment" element={
          <PrivateRoute>
            <AppointmentScheduling />
          </PrivateRoute>
        } />
        <Route path="/appointment/confirmation" element={
          <PrivateRoute>
            <AppointmentConfirmation />
          </PrivateRoute>
        } />
        <Route path="/appointments" element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        } />
        <Route path="/appointments/:id" element={
          <PrivateRoute>
            <AppointmentDetails />
          </PrivateRoute>
        } />
        <Route path="/appointments/pending/:id" element={
          <PrivateRoute>
            <PendingAppointmentDetails />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/practitioner-type" element={
          <PrivateRoute>
            <PractitionerTypeChoice />
          </PrivateRoute>
        } />
        <Route path="/practitioner-signup" element={
          <PrivateRoute>
            <PractitionerSignup />
          </PrivateRoute>
        } />
        <Route path="/practitioner-info" element={
          <PrivateRoute>
            <PractitionerInfo />
          </PrivateRoute>
        } />
        <Route path="/practitioner-preview" element={
          <PrivateRoute>
            <PractitionerPreview />
          </PrivateRoute>
        } />
        <Route path="/practitioner-dashboard" element={
          <PrivateRoute>
            <PractitionerDashboard />
          </PrivateRoute>
        } />
        <Route path="/professional-details" element={
          <PrivateRoute>
            <ProfessionalDetails />
          </PrivateRoute>
        } />
        <Route path="/travel-guide" element={
          <PrivateRoute>
            <TravelGuide />
          </PrivateRoute>
        } />
        <Route path="/patients" element={
          <PrivateRoute>
            <PatientHistory />
          </PrivateRoute>
        } />

        {/* Facility routes */}
        <Route path="/facility-dashboard" element={
          <PrivateRoute>
            <FacilityDashboard />
          </PrivateRoute>
        } />
        <Route path="/facility-registration" element={
          <PrivateRoute>
            <FacilityRegistration />
          </PrivateRoute>
        } />
        <Route path="/facility-staff" element={
          <PrivateRoute>
            <FacilityStaffManagement />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Chat Support Widget */}
      <ChatSupport />
    </div>
  );
}