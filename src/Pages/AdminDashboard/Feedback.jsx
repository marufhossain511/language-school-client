import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const Feedback = () => {

    const loadData=useLoaderData()
    console.log(loadData);

    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
      const feedback=data.feedback
      console.log(feedback);
      fetch(`http://localhost:5000/denyclasses/${loadData._id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({feedback})
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
      })
  }
    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold font-mono text-center">Write Your Feedback</h2>
            <div className="">
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card mx-auto w-96 bg-base-100 shadow-xl">
                <div className="card-body">   
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Your Feedback</span>
                </label>
                <textarea {...register("feedback", { required: true ,maxLength:30})} className="textarea textarea-bordered h-24" placeholder="feedback must be less than 30 characters"></textarea>
                {errors.feedback?.type === 'required' && <p className='text-red-600'>This field is required</p>}
                {errors.feedback?.type === 'maxLength' && <p className='text-red-600'> password must be less than 30 characters</p>}
                <input className="btn btn-block my-4 bg-accent-focus" type="submit" value="Submit" />
                </div>
                </div>
                </div>
                  </form>
           </div>
        </div>
    );
};

export default Feedback;