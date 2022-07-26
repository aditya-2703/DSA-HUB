row = 23
col  = 31
string = """
   ████████████████████████████
         █  █  █              █
█  ████  █  █  █  █  ███████  █
█     █  █     █  █     █     █
████  ████  █  █  ██████████  █
█        █  █     █     █     █
█  ███████  ███████  ████  ████
█  █        █           █     █
█  █  ████  ████  ████  █  ████
█        █        █  █  █     █
█  █  ████  ████  █  ██████████
█  █  █     █  █     █        █
█  ████  █  █  █████████████  █
█     █  █                    █
█  █  ███████  █  █████████████
█  █  █  █  █  █           █  █
█  ████  █  ████  █  █  ████  █
█     █        █  █  █  █     █
████  █  ████  █  ████  █  █  █
█           █  █  █        █  
████████████████████████████  
"""

matrix = [["." for i in range(col)]for j in range(row)]
arr = string.split("\n")



for i in range(row):
    string_arr = list(arr[i])

    for j in range(col):
        if j<len(string_arr):
            if string_arr[j] == "█":
                string_arr[j] = "#"
            else:
                string_arr[j] = "."
            matrix[i][j] = string_arr[j]


    
# for i in range(row):
#     curr =  ""
#     for j in range(col):
#         curr+= matrix[i][j]
#     print(curr)

def print_grid(grid):
    for i in grid:
        string = ""
        for j in i:
            if j==".":
                string+=" "
            elif j=="#":
                string+="█"
            else:
                string+=j
        # i.replace("."," ")
        # i.replace("#","█")
        print(string)
    print("==="*6)

class Solution:
    def __init__(self,row,col,matrix):
        self.n = row
        self.m = col
        self.matrix = matrix
    def is_not_valid(self,row,col,grid):
        if row<0 or col<0 or row>=self.n or col>=self.m or grid[i][j]=="#":
            return True
        return False
    def helper(self,i,j,grid,visited):
        if self.is_not_valid(i,j,grid) or visited[i][j]==True:
            return False
        if i==self.n-1 and j==self.m-1:
            print_grid(grid)
            return True

        if grid[i][j] == ".":
            grid[i][j] = "+"
            visited[i][j] = True
            flag = self.helper(i+1,j,grid,visited)
            if flag:
                return True
            flag = self.helper(i-1,j,grid,visited)
            if flag:
                return True
            flag = self.helper(i,j+1,grid,visited)
            if flag:
                return True
            flag = self.helper(i,j-1,grid,visited)
            if flag:
                return True

            visited[i][j] = False
            grid[i][j] = "."

    def get_solution(self):
        matrix = self.matrix
        visited= [[False for i in range(self.m)]for j in range(self.n)]
        self.helper(0,0,matrix,visited)


escapes = '\b\n\r\t\\' 

for i in range(row):
    for j in range(col):
        for k in escapes:
	        matrix[i][j] = matrix[i][j].replace(k,"")

print(matrix)


# obj = Solution(row,col,matrix)
# obj.get_solution()






