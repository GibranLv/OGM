package encrypted

import (
	"errors"
	"math/rand"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Costants of params
const (
	KeyExpired = "expired"
	KeyUserID  = "user_id"
	KeyClient  = "client"
)

type claimsAccessTokenWS struct {
	UserID int64  `json:"user_id"`
	Client string `json:"client"`
	jwt.StandardClaims
}

type claimsAccessTokenTCP struct {
	Client string `json:"client"`
	jwt.StandardClaims
}

// GetTokenWS ...
func GetTokenWS(key string, values map[string]interface{}, issuer string) (string, error) {
	bsSigningKey := []byte(key)

	var claims jwt.Claims

	userID, isInt := values[KeyUserID].(int64)
	if !isInt {
		msg := "getToken.KeyValue isn't int64"
		return "", errors.New(msg)
	}

	client, isString := values[KeyClient].(string)
	if !isString {
		msg := "getToken.KeyUsername isn't string"
		return "", errors.New(msg)
	}

	expireToken := time.Now().Add(time.Second * 15).Unix()

	claims = &claimsAccessTokenWS{
		userID,
		client,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(bsSigningKey)
	return ss, err
}

// GetTokenTCP ...
func GetTokenTCP(key string, values map[string]interface{}, issuer string) (string, error) {
	bsSigningKey := []byte(key)

	var claims jwt.Claims

	client, isString := values[KeyClient].(string)
	if !isString {
		msg := "GetTokenTCP.KeyClient isn't string"
		return "", errors.New(msg)
	}

	expireToken := time.Now().Add(time.Second * 15).Unix()

	claims = &claimsAccessTokenTCP{
		client,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(bsSigningKey)
	return ss, err
}

// ParseAccessTokenWS ...
func ParseAccessTokenWS(key, tokenString string) (map[string]interface{}, error) {
	values := make(map[string]interface{})

	token, err := jwt.ParseWithClaims(tokenString, &claimsAccessTokenWS{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		return values, err
	}

	if claims, ok := token.Claims.(*claimsAccessTokenWS); ok {
		values[KeyExpired] = false
		values[KeyUserID] = claims.UserID
		values[KeyClient] = claims.Client
	}

	if !token.Valid {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return values, err
			}

			if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
				values[KeyExpired] = true
				return values, nil
			}
		}

		return values, err
	}

	return values, err
}

// ParseAccessTokenTCP ...
func ParseAccessTokenTCP(key, tokenString string) (map[string]interface{}, error) {
	values := make(map[string]interface{})

	token, err := jwt.ParseWithClaims(tokenString, &claimsAccessTokenTCP{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		return values, err
	}

	if claims, ok := token.Claims.(*claimsAccessTokenTCP); ok {
		values[KeyExpired] = false
		values[KeyClient] = claims.Client
	}

	if !token.Valid {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return values, err
			}

			if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
				values[KeyExpired] = true
				return values, nil
			}
		}

		return values, err
	}

	return values, err
}

// GetHash ...
func GetHash(n int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
