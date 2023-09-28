import React, { useEffect, useState } from 'react';
import {useLoaderData} from 'react-router-dom';


export const githubInfoLoader = async () => {
    const data = await fetch('https://api.github.com/users/achintyaSingh');
    return data.json();
}

function Github() {

    const data = useLoaderData();

    // const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('https://api.github.com/users/achintyaSingh')
//     .then(res => res.json())
//     .then(info => setData(info));
//   }, []);
  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
        Github followers: {data.followers}
        <img src={data.avatar_url} alt="Github pic" width={300} />
    </div>
  )
}

export default Github;
