import './FormContainer.css';

export const FormContainer = ({ title, children }) => {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
};