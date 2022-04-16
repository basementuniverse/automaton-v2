# Automaton V2

## Actor types

### Resources

red, green or blue
takes 1s to grow

### Product

red, green, blue, cyan, magenta, yellow, black, white
level 1-n

### Extractor

place on a resource
harvests resources into level-1 products
has a capacity of 8

### Pipe

products travel down pipes in 1 direction

### Merger

1 output, up to 3 inputs
has capacity of 3
merges pipelines

### Splitter

1 input, 2 outputs
one output can be configured with a colour and level condition
send everything else to the other output

### Disposal

destroys products and produces a small amount of power

### Factory

2 inputs, 1 output
combines products (colours) and increments level
if both inputs have same level, increment level, otherwise use the highest

### Silo

has a capacity of 64 products
will share products with adjacent silos

### Refinery

1 input, 2 outputs
splits colours without reducing level

### Consumer

has colour & level requirements
will die if not fed
awards points when fed (depending on colour/level match)

### Generator

outputs coloured power
boosts everything in range
power spreads less across terrain borders
power spreads more across populated tiles

### Road

transporters can travel along roads
roads can form loops, branches etc.

### Transporter

will use path-finding to travel between target locations
can have colour / level conditions
when empty, will try to find the nearest place to collect products
when filling up, will continue filling up until full, or until their fill-up timeout is reached
after filling up, will try to find the nearest place to drop off products
