import Card from './components/Card';
import Button from './components/Button';
import css from './css/App.module.css';
import { useState } from 'react';
import './index.css';
const App = () => {
  // 게임 상태 관리
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 선택지 정의
  const choices = ['가위', '바위', '보', '?'];

  // 컴퓨터의 랜덤 선택 생성
  const generarteRandomChoice = () => {
    const index = Math.floor(Math.random() * 3);
    return choices[index];
  };

  // 승패 판단 함수
  const determineWinner = (user, computer) => {
    if (user === computer) return '무승부';
    if (
      (user === '가위' && computer === '보') ||
      (user === '바위' && computer === '가위') ||
      (user === '보' && computer === '바위')
    ) {
      return '이겼다';
    }
    return '졌다';
  };

  // 유저가 버튼 클릭했을 때 실행되는 로직
  const handleUserChoice = (choice) => {
    console.log('버튼 클릭', choice);
    if (isPlaying) return;

    setIsPlaying(true); // 버튼 연타 방지
    setUserChoice(choice);

    // 잠깐 delay를 줘서 컴퓨터가 "생각하는 것처럼" 보이게!
    setTimeout(() => {
      const compChioce = generarteRandomChoice();
      setComputerChoice(compChioce);
      setResult(determineWinner(choice, compChioce));
      setIsPlaying(false);
    }, 300);
  };

  //  다시하기 버튼 누르면 상태 초기화
  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className={css.container}>
      <h1>가위바위보 게임</h1>

      {/*  게임 영역 */}
      <section className={css.cardGroup}>
        {/* 플레이어 카드 */}
        <Card
          userTitle="User"
          choice={userChoice}
          result={
            result === '이겼다' ? '이겼다' : result === '졌다' ? '졌다' : result
          }
          type="user"
        />
        {/*  컴퓨터 카드 */}
        <Card
          userTitle="Computer"
          choice={computerChoice}
          result={
            result === '졌다' ? '이겼다' : result === '이겼다' ? '졌다' : result
          }
          type="computer"
        />

        {/*  버튼 & 결과 영역 */}
        <div className={css.buttonGroup}>
          {/* 선택 버튼들 */}
          {choices.slice(0, 3).map((choice) => (
            <Button
              key={choice}
              choice={choice}
              onClick={() => handleUserChoice(choice)}
              disabled={isPlaying}
            />
          ))}

          {/*  결과 표시 */}
          <div className={css.resultDisplay}>{result}</div>

          {/*  다시하기 버튼 */}
          <button className={css.resetButton} onClick={resetGame}>
            다시하기
          </button>
        </div>
      </section>

      {/*  게임 설명 */}
      <div>
        <p>버튼을 클릭하여 가위, 바위, 보 중 하나를 선택하세요.</p>
        <p>컴퓨터는 랜덤으로 선택합니다.</p>
      </div>
    </div>
  );
};

export default App;
