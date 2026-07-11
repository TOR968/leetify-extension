---@meta

---@class utils
local utils = {}

---@return string|nil path
function utils.get_backend_path() end

---@param path string
---@return string|nil content
---@return string? error
function utils.read_file(path) end

---@param path string
---@param content string
---@return boolean|nil success
---@return string? error
function utils.write_file(path, content) end

return utils
