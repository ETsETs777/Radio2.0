import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <h2>Вход</h2>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default LoginPage;