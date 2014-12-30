$a = 999
$b = 999

while $a > 0 do
    $prod = $a*$b
    until $prod < ($a-1)*($a-1) do
        $prodS = $prod.to_s
        $l = $prodS.length
        $isPal = true
        for i in 0..$l/2 do
            if $prodS[i] != $prodS[$l-i-1] then
                $isPal = false
                break;
            end
        end
        if $isPal then
            puts("#{$prodS} = #{$a} * #{$b}")
            exit
        end
        $b = $b - 1
    end
    $a = $a - 1
    $b = 999
end 
