import styles from './LeaderBoard.module.css';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";




const Leaderboard = () => {
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [sortedResults, setSortedResults] = useState([]);

  useEffect(() => {
    if (quizzes) {
      const newQuizData = quizzes.find((quiz) => quiz._id === id) || {};
      setQuizData(newQuizData);

      const newsortedResults = newQuizData.results
        ? [...newQuizData.results].sort((a, b) => b.marks - a.marks)
        : [];
      setSortedResults(newsortedResults);
    }
  }, [quizzes, id]);

  return (
    <>
   
    <div className='p-5' >
    <main className={styles.main}>
      <div id={styles.header}>
        <h1 className={styles.h1}>  {quizData.quizName || "Quiz Not Found"} Leaderboard</h1>
        <button className={styles.share}><div>
        🏆
        </div></button>
      </div>
      <div id={styles.leaderboard}>
        <div className={styles.ribbon}></div>
        <table className={styles.tab}>
          <tbody>
            {quizData && sortedResults.length > 0 ? (
              <>
                <tr className={styles.trr}>
                  <td className={styles.number}>1</td>
                  <td className={styles.name}>{sortedResults[0].name}</td>
                  <td className={styles.name}>{sortedResults[0].email}</td>
                  <td className={styles.points}>
                   
                    <img
                      className={styles.goldMedal}
                      src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                      alt="gold medal"
                    />  
                     {sortedResults[0].marks}
                  </td>
                </tr>
                {sortedResults.slice(1).map((r, i) => (
                  <tr key={i + 1} className={styles.trr}>
                    <td className={styles.number}>{i + 2}</td>
                    <td className={styles.name}>{r.name}</td>
                    <td className={styles.name}>{r.email}</td>
                    <td className={styles.points}>{r.marks}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="py-5 text-center w-100" colSpan={4}>
                  No Results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-100 flex justify-content-center">
          <Link to="/">
            <button
              className="my-3 btn btn-primary"
              style={{ width: "200px", margin: "0px calc(50% - 100px)" }}
            >
              Go Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
    </div>
    </>
  );
};

export default Leaderboard;
