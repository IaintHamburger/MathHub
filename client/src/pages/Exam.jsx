import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Latex from "react-latex-next";

const Exam = () => {
    const params = useParams();                     // 從 URL 獲取參數
    const [data, setData] = useState([]);           // 查詢題目
    const [loading, setLoading] = useState(true);   // 載入狀態

    useEffect(() => {
        fetch(`http://localhost:5000/quest/getQuest/${params.questId}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>{data.title}</h1>
            <Latex>{`$${data.question}$`}</Latex>
            <form action={`http://localhost:5000/quest/answerQuest/${params.questId}`} method="GET">
                <input type="text" name="answer" className="bg-white text-black" />
                <input type="submit" />
            </form>
        </div >
    );
};

export default Exam;