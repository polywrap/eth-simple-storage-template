package e2e

sanity: {
  $0: {
    data: =~"^0x[A-Fa-f0-9]{64}$",
    error?: _|_,
  }
  $1: { 
    data: uint, 
    error?: _|_ 
  }
}