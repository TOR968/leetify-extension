import PluginUtils # type: ignore[import]

class Logger:
    def __init__(self):
        self._logger = PluginUtils.Logger()
    
    def info(self, message: str) -> None:
        """Log an info message"""
        self._logger.log(message)
    
    def error(self, message: str) -> None:
        """Log an error message"""
        self._logger.log(f"ERROR: {message}")
    
    def warning(self, message: str) -> None:
        """Log a warning message"""
        self._logger.log(f"WARNING: {message}")
    
    def debug(self, message: str) -> None:
        """Log a debug message"""
        self._logger.log(f"DEBUG: {message}")

logger = Logger()
