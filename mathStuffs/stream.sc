(define-macro delay
  (lambda (expr)
    `(lambda () ,expr)))
    
(define (force promise) (promise))

(define head car)

(define (tail stream) (force (cdr stream)))

(define empty-stream? null?)

(define the-empty-stream '())

(define-macro cons-stream
  (lambda (a b)
    `(cons ,a (delay ,b))))
    
(define (stream-section n stream)
  (if (= n 0) '()
    (cons (head stream)
    (stream-section (- n 1) (tail stream)))))

(define (stream-filter p? s)
  (if (empty-stream? s) '()
      (let ((h (head s))
            (t (tail s)))
        (if (p? h)
            (cons-stream h (stream-filter p? t))
            (stream-filter p? t)))))