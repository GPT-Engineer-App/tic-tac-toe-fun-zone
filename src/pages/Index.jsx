import React, { useState } from "react";
import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const toast = useToast();

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
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
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
      <Button h="100px" w="100px" fontSize="3xl" colorScheme="teal" onClick={() => handleClick(i)}>
        {board[i]}
      </Button>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  if (winner) {
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

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Text fontSize="4xl" marginBottom="8">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {Array(9)
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
