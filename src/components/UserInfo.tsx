import React, { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  username: string;
  password: string;
}

interface UserInfoProps {
  userId: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/user/${userId}`);
      const userData = response.data;

      // Hash the password securely
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      setUser({
        ...userData,
        password: hashedPassword,
      });
    };
    fetchUser();
  }, [userId]);

  if (!user) return null;

  return (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
      {JSON.stringify(user, null, 2)}
    </pre>
  );
};

export default UserInfo;
