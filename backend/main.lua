local logger = require("logger")
local millennium = require("millennium")
local fs = require("fs")
local io = require("io")

local function safe_call(label, fn)
    local ok, err = pcall(fn)
    if not ok then
        logger:error(string.format("Leetify Extension: %s failed: %s", label, tostring(err)))
    end
end

local function on_load()
    safe_call("load", function()
        logger:info("Leetify Extension: Starting plugin initialization...")
        millennium.ready()
        logger:info("Leetify Extension: Plugin loaded successfully")
    end)
end

local function on_frontend_loaded()
    safe_call("frontend load", function()
        logger:info("Leetify Extension: Frontend loaded successfully")
    end)
end

local function on_unload()
    safe_call("unload", function()
        logger:info("Leetify Extension: Plugin unloading...")
        logger:info("Leetify Extension: Plugin unloaded successfully")
    end)
end

local function get_data_path()
    return millennium.get_install_path() .. "/data/leetify_api.txt"
end

local function save_api_key(key)
    logger:info("Leetify Extension: Saving API key...")
    local path = get_data_path()
    local parent = fs.parent_path(path)
    if not fs.exists(parent) then
        fs.create_directories(parent)
    end
    
    local file = io.open(path, "w")
    if file then
        file:write(tostring(key))
        file:close()
        logger:info("Leetify Extension: API key saved successfully")
        return true
    else
        logger:error("Leetify Extension: Failed to open file for writing: " .. tostring(path))
        return false
    end
end

local function read_api_key()
    local path = get_data_path()
    local file = io.open(path, "r")
    if file then
        local content = file:read("*all")
        file:close()
        logger:info("Leetify Extension: API key read successfully")
        return content
    end
    return ""
end

return {
    on_load = on_load,
    on_frontend_loaded = on_frontend_loaded,
    on_unload = on_unload,
    save_api_key = save_api_key,
    read_api_key = read_api_key
}