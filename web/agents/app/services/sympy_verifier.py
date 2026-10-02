import sympy as sp

def verify_algebraic_step(expression_str: str):
    try:
        expr = sp.parse_expr(expression_str)
        simplified = sp.simplify(expr)
        return {"valid": True, "simplified": str(simplified)}
    except Exception as e:
        return {"valid": False, "error": str(e)}