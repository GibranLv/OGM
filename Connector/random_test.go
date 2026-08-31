package main

import (
	"crypto/rand"
	"math/big"
	"testing"
)

func TestRandomNumber(t *testing.T) {
	for i := 0; i < 20; i++ {
		value, err := rand.Int(rand.Reader, big.NewInt(10))
		number := value.Int64() + 1
		if err != nil {
			t.Fatalf("expected %v want nil", err)
		}

		if number == 0 {
			t.Fatalf("expected %v want value > 0", number)
		}
	}
}
