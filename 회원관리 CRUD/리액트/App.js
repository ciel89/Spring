import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MemberList from "./pages/MemberList";
import MemberForm from "./pages/MemberForm";
import EditMember from "./pages/EditMember";
import DeleteMember from "./pages/DeleteMember";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/members/new" element={<MemberForm />} />
        <Route path="/members/edit/:id" element={<EditMember />} />
        <Route path="/members/delete/:id" element={<DeleteMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
