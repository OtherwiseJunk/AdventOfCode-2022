input = File.open('./input/06.txt').read.split("\n")
currentDir = []
files = Hash.new(0)
directories = Hash.new(0)
maxFileSize = 100000
totalDiskSpace = 70000000
spaceToFree = 30000000

for line in input do
    case line.split(" ")
    in ["$", "cd", dir]
        if(dir == "..")
            currentDir.pop
        else
            currentDir << dir
        end
    in [/\d+/ => size, file]
        files[currentDir.dup] += size.to_i
    else
    end
end
   
files.each do |(*path), size|
    while(path.length > 0)
        directories[path.dup] += size
        path.pop
    end
end

minimumFileSize = spaceToFree - (totalDiskSpace - directories[["/"]])

puts directories.values.select{|size| size <= maxFileSize}.sum

puts directories.values.select{|size| size >= minimumFileSize}.min