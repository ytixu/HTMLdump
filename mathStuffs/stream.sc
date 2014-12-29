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
            
(define (sieve stream)
  (cons-stream
     (head stream)
     (sieve 
      (stream-filter
         (lambda (x) (not (= (mod x (head stream)) 0)))
         (tail stream)))))

(define (merge la lb)
    (if (null? la) lb
        (cons (car la) (merge (cdr la) lb))))

(define (root n d)
    (if (= (mod n d) 0) (root (/ n d) d) n))

(define (nat n) (cons-stream n (nat (+ n 1))))

(define startSieve (sieve (nat 2)))

(define (primeDivisors n str bound)
    (let ((h (head str))
            (t (tail str)))
        (if (> h bound) (cons n '())
            (if (= (mod n h) 0) 
                (cons h (primeDivisors (root n h) t bound))
                (primeDivisors n t (/ n h))
            )
        )
    )
)
(primeDivisors 600851475143 startSieve 100)



