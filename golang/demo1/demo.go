// package main

// import (
// 	"fmt"
// )

// func main() {
// 	fmt.Println("hahahaha")
// }

package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/", test)
	http.ListenAndServe("127.0.0.1:8081", nil)
}

func test(w http.ResponseWriter, req *http.Request) {
	usrId := "login1"
	pwd := "pwd12344"

	//json序列化
	data := "{\"UserId\":\"" + usrId +
		"\",\"Password\":\"" + pwd +
		"\"}"

	io.WriteString(w, string(data))
}
