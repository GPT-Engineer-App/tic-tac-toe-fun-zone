import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Text, useToast, VStack } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const toast = useToast();

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setScore({ ...score, [winner]: score[winner] + 1 });
      toast({
        title: `Player ${winner} won!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (!board.includes(null)) {
      toast({
        title: "Draw!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [board]);

  const winner = calculateWinner(board);

  function handleClick(index) {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[index]) return;
    // Put an X or an O in the clicked square
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    // Adjusted winning conditions for a 4x4 board
    const lines = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function renderSquare(i) {
    return (
      <Button h="50px" w="50px" fontSize="xl" colorScheme={board[i] === "X" ? "red" : board[i] === "O" ? "yellow" : "teal"} onClick={() => handleClick(i)}>
        {board[i]}
      </Button>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const Leaderboard = () => (
    <VStack align="stretch" mb="8">
      <Text fontSize="2xl">Leaderboard</Text>
      <Text fontSize="xl">X (Player 1): {score.X}</Text>
      <Text fontSize="xl">O (Player 2): {score.O}</Text>
    </VStack>
  );

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Leaderboard />
      <Text fontSize="4xl" mb="8">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {Array(16)
          .fill(null)
          .map((_, i) => (
            <Box key={i}>{renderSquare(i)}</Box>
          ))}
      </Grid>
      <Button colorScheme="blue" marginTop="8" onClick={resetGame}>
        New Game
      </Button>
    </Flex>
  );
};

export default Index;
