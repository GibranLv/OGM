package encrypted

import (
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/dgrijalva/jwt-go"
)

type claimsAccessToken struct {
	UserSession int32  `json:"user_session"`
	UserID      int64  `json:"user_id"`
	Hash        string `json:"hash"`
	jwt.StandardClaims
}

type claimsRefreshToken struct {
	UserSession int32  `json:"user_session"`
	UserID      int64  `json:"user_id"`
	Hash        string `json:"hash"`
	jwt.StandardClaims
}

type claimsAccessTokenv2 struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

// GetEncoding ...
func GetEncoding(jsonIn string) (hash string) {
	var reverse string

	size := len(jsonIn) - 1
	for i := size; i > -1; i-- {
		character := jsonIn[i]
		reverse = reverse + string(character)
	}

	reverse = strings.ReplaceAll(reverse, ":", "$")
	reverse = strings.ReplaceAll(reverse, "a", "D")
	reverse = strings.ReplaceAll(reverse, "e", "")
	reverse = strings.ReplaceAll(reverse, "i", "3")
	reverse = strings.ReplaceAll(reverse, "o", "")
	reverse = strings.ReplaceAll(reverse, "u", "v")
	reverse = strings.ReplaceAll(reverse, "{", "o")
	reverse = strings.ReplaceAll(reverse, "}", "c")

	bs := []byte(reverse)

	hasher := sha256.New()
	hasher.Write(bs)
	hash = base64.StdEncoding.EncodeToString(hasher.Sum(nil))

	return hash
}

// GetEncodeURL ...
func GetEncodeURL(url string) string {
	url = strings.ReplaceAll(url, "%3A", ":")
	url = strings.ReplaceAll(url, "%2F", "/")
	url = strings.ReplaceAll(url, "%3F", "?")
	url = strings.ReplaceAll(url, "%3D", "=")

	return url
}

func msToTime(ms string) (time.Time, error) {
	msInt, err := strconv.ParseInt(ms, 10, 64)
	if err != nil {
		return time.Time{}, err
	}

	return time.Unix(0, msInt*int64(time.Millisecond)), nil
}

func getDateString(t time.Time) string {
	var h, min, sec, y, m, d string

	hour := t.Hour()
	minute := t.Minute()
	second := t.Second()
	year := t.Year()
	month := t.Month()
	day := t.Day()

	if hour < 10 {
		h = "0" + strconv.Itoa(hour)
	} else {
		h = strconv.Itoa(hour)
	}

	if minute < 10 {
		min = "0" + strconv.Itoa(minute)
	} else {
		min = strconv.Itoa(minute)
	}

	if second < 10 {
		sec = "0" + strconv.Itoa(second)
	} else {
		sec = strconv.Itoa(second)
	}

	if day < 10 {
		d = "0" + strconv.Itoa(day)
	} else {
		d = strconv.Itoa(day)
	}

	if year < 10 {
		y = "0" + strconv.Itoa(year)
	} else {
		y = strconv.Itoa(year)
	}

	if month == time.January {
		m = "01"
	}

	if month == time.February {
		m = "02"
	}

	if month == time.March {
		m = "03"
	}

	if month == time.April {
		m = "04"
	}

	if month == time.May {
		m = "05"
	}

	if month == time.June {
		m = "06"
	}

	if month == time.July {
		m = "07"
	}

	if month == time.August {
		m = "08"
	}

	if month == time.September {
		m = "09"
	}

	if month == time.October {
		m = "10"
	}

	if month == time.November {
		m = "11"
	}

	if month == time.December {
		m = "12"
	}

	s := fmt.Sprintf("%s:%s:%s %s-%s-%s", h, min, sec, y, m, d)
	return s
}

// GetTokenAPIv2 ...
func GetTokenAPIv2(key string, values map[string]interface{}, issuer string) (string, error) {
	bsSigningKey := []byte(key)

	var claims jwt.Claims

	userID, ok := values[constants.KeyUserID].(string)
	if !ok {
		msg := "GetTokenAPI.KeyValue isn't string"
		return "", errors.New(msg)
	}

	// expireToken := time.Now().Add(time.Hour * 24).Unix()
	expireToken := time.Now().Add(1 * time.Minute).Unix()

	//fmt.Println("GET TOKEN API: 3 MINUTES")

	claims = &claimsAccessTokenv2{
		userID,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(bsSigningKey)
	return ss, err
}

// GetTokenAPI ...
func GetTokenAPI(key string, values map[string]interface{}, issuer string) (string, error) {
	bsSigningKey := []byte(key)

	var claims jwt.Claims

	userSession, ok := values[constants.KeyUserSession].(int32)
	if !ok {
		msg := "GetTokenAPI.KeyValue isn't int32"
		return "", errors.New(msg)
	}

	userID, ok := values[KeyUserID].(int64)
	if !ok {
		msg := "GetTokenAPI.KeyUserID isn't int64"
		return "", errors.New(msg)
	}

	hash, ok := values[constants.KeyHash].(string)
	if !ok {
		msg := "GetTokenAPI.KeyHash isn't string"
		return "", errors.New(msg)
	}

	expireToken := time.Now().Add(time.Hour * 24).Unix()
	//expireToken := time.Now().Add(time.Minute * 3).Unix()

	//fmt.Println("GET TOKEN API: 3 MINUTES")

	claims = &claimsAccessToken{
		userSession,
		userID,
		hash,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(bsSigningKey)
	return ss, err
}

// GetRefreshTokenAPI ...
func GetRefreshTokenAPI(key string, values map[string]interface{}, issuer string) (string, error) {
	bsSigningKey := []byte(key)

	var claims jwt.Claims

	userSession, ok := values[constants.KeyUserSession].(int32)
	if !ok {
		msg := "GetRefreshTokenAPI.KeyValue isn't int32"
		return "", errors.New(msg)
	}

	userID, ok := values[KeyUserID].(int64)
	if !ok {
		msg := "GetRefreshTokenAPI.KeyUserID isn't int64"
		return "", errors.New(msg)
	}

	hash, ok := values[constants.KeyHash].(string)
	if !ok {
		msg := "GetRefreshTokenAPI.KeyHash isn't string"
		return "", errors.New(msg)
	}

	expireToken := time.Now().Add(time.Hour * 36).Unix()
	//expireToken := time.Now().Add(time.Minute * 5).Unix()

	// fmt.Println("GET REFRESH TOKEN API: 5 MINUTES")

	claims = &claimsAccessToken{
		userSession,
		userID,
		hash,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(bsSigningKey)
	return ss, err
}

// ParseAccessTokenAPI ...
func ParseAccessTokenAPIv2(key, tokenString string) (map[string]interface{}, error) {
	values := make(map[string]interface{})

	token, err := jwt.ParseWithClaims(tokenString, &claimsAccessTokenv2{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		msg := err.Error()
		if !strings.Contains(msg, constants.ExpiredMsg) {
			return values, err
		}
	}

	if claims, ok := token.Claims.(*claimsAccessTokenv2); ok {
		values[KeyExpired] = false
		values[constants.KeyUserID] = claims.UserID
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

// ParseAccessTokenAPI ...
func ParseAccessTokenAPI(key, tokenString string) (map[string]interface{}, error) {
	values := make(map[string]interface{})

	token, err := jwt.ParseWithClaims(tokenString, &claimsAccessToken{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		msg := err.Error()
		if !strings.Contains(msg, constants.ExpiredMsg) {
			return values, err
		}
	}

	if claims, ok := token.Claims.(*claimsAccessToken); ok {
		values[KeyExpired] = false
		values[constants.KeyUserSession] = claims.UserSession
		values[KeyUserID] = claims.UserID
		values[constants.KeyHash] = claims.Hash
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

// ParseRefreshTokenAPI ...
func ParseRefreshTokenAPI(key, tokenString string) (map[string]interface{}, error) {
	values := make(map[string]interface{})

	token, err := jwt.ParseWithClaims(tokenString, &claimsRefreshToken{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		msg := err.Error()
		if !strings.Contains(msg, constants.ExpiredMsg) {
			return values, err
		}
	}

	if claims, ok := token.Claims.(*claimsRefreshToken); ok {
		values[constants.KeyUserSession] = claims.UserSession
		values[KeyUserID] = claims.UserID
		values[constants.KeyHash] = claims.Hash
	}

	if !token.Valid {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return values, err
			}

			if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
				return values, err
			}
		}

		return values, err
	}

	return values, err
}
