const ChildComponent = (props) => {
  return (
    <div>
      <h1>Welcome {props.user.name}</h1>
      <h4>{props.user.email}</h4>
    </div>
  );
};

export default ChildComponent;
