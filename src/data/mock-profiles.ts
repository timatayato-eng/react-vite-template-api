export interface MockProfile {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
}

export const MOCK_PROFILES: MockProfile[] = [
  {
    id: 1,
    email: "admin@test.com",
    name: "Admin",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    email: "user@test.com",
    name: "Test User",
    password: "password",
    role: "user",
  },
];

export function findProfileByCredentials(
  email: string,
  password: string,
): MockProfile | undefined {
  return MOCK_PROFILES.find(
    (profile) => profile.email === email && profile.password === password,
  );
}

export function findProfileById(id: number): MockProfile | undefined {
  return MOCK_PROFILES.find((profile) => profile.id === id);
}
