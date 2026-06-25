import ChildComponent from "./ChildComponent"
const ParentComponent = () => {

    const userDetails1={
        name:"ravi",
        email:"ravi@gmail.com"
    }

    const userDetails2={
        name:"Sai",
        email:"sai@gmail.com"
    }
    
  return (
    <div>
      <ChildComponent user={userDetails1}/>
      <ChildComponent user={userDetails2}/>
    </div>
  )
}

export default ParentComponent
